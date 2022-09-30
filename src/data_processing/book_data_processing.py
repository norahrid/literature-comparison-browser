from urllib.request import urlopen
from bs4 import BeautifulSoup
from collections import defaultdict
import io, json

base_dir = "/Users/norahr/Desktop/"
unwanted_characters = ["*"]
volumes = ["\nVOLUME I\n", "\nVOLUME II\n", "\nVOLUME III\n"]

"""
Remove punctuation from a word
@param word: string to be stripped of punctuation
@return a string stripped of select punctuation
"""
def remove_punctuation(word):
    temp = word
    punctuation_list = [",", ".", "!", "?", "-", "--", ";", ":", '”', "“", '"', "'", "—"]
    for p in punctuation_list:
        temp = temp.replace(p, "")
    return temp

def download_url(url_path):
    try:
        with urlopen(url_path, timeout=3) as conn:
            return conn.read()
    except:
        return None

"""
Get text content of book
@param content: text content from html
@return tuple of book text and title
"""
def get_book_content(content):
    html = content.decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')

    # also grab title so we know what book it is
    title = soup.find("title").getText().split(",")[0].replace("The Project Gutenberg eBook of ", "").strip()
  
    text = list()
    for c in soup.find_all("div", attrs={"class": "chapter"}):
        text.append(c.getText())
    return text, title

"""
Sort book data by chapter and remove formatting
@param book_id: string of the book's id on Project Gutenberg
@return tuple of book text (sorted by chapter) and book title
"""
def process_book_data(book_id):
    content = download_url(f'https://www.gutenberg.org/files/{book_id}/{book_id}-h/{book_id}-h.htm')
    text_content, title = get_book_content(content)
    sorted_by_chapter = dict()
    chapter_count = 0
    for ch in range(len(text_content)):
        if text_content[ch] not in volumes:
            words = text_content[ch].split()
            processed_words = list()
            for w in range(len(words)):
                # remove chapter headings
                if words[w].strip() == "CHAPTER": # and words[w+1].strip().isdigit():
                    chapter_count += 1
                else:
                    clean_word = remove_punctuation(words[w].strip()).lower()
                    # ignore all empty strings
                    if len(clean_word) > 0 and clean_word not in unwanted_characters:
                        processed_words.append(clean_word)
            sorted_by_chapter[chapter_count] = processed_words

    if len(text_content) != chapter_count:
        raise AssertionError("Didn't extract all of the chapter headings from the text.")

    return sorted_by_chapter, title

"""
Prepare data for use in the visualization
@param processed_book: cleaned book text
@param title: book title
@return dictionary of book data
"""
def format_to_json(processed_book, title):
    # maintain word ordering with the list of dicts
    data = defaultdict(list)
    start_position = 0
    for chapter in processed_book:
        for w in range(len(processed_book[chapter])):
            word_data = {
                "title": title,
                "chapter": chapter,
                "word": processed_book[chapter][w],
                "start": start_position + w,
                "end": start_position + w + 1,
                "length": len(processed_book[chapter][w])
            }
            data[chapter].append(word_data)
        start_position += len(processed_book[chapter])

    return data

"""
Make JSON file of book data
@param dir: name of target directory
@param filename: name of target file
@param data: book data to write to file
@return True if data is successfully written to file; False otherwise
"""
def create_json_file(dir, filename, data):
    try:
        with io.open(dir + filename, 'w') as json_file:
            json.dump(data, json_file)
        return True
    except Exception as e:
        return False

book_data, title = process_book_data("161")
json_format = format_to_json(book_data, title)
result = create_json_file(base_dir, title.replace(" ", "_") + "_data.json", json_format)

if result:
    print("File successfully created!")
else:
    print("There was a problem creating the file.")





