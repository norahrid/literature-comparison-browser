#!/bin/sh

for i in src/preprocessedAssets/LENS_TOMENTOSUS*; do 
    git filter-repo --invert-paths --path $i
done