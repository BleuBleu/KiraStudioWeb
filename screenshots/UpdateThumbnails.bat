del /q ..\thumbnails\*.png
"D:\Temp\ImageMagick-7.1.1-39-portable-Q8-x64\mogrify.exe" -resize 480x270 -quality 100 -define png:compression-level=9 -path ../thumbnails/ desktop*.png
"D:\Temp\ImageMagick-7.1.1-39-portable-Q8-x64\mogrify.exe" -resize 50%% -quality 100 -define png:compression-level=9 -path ../thumbnails/ mobile*.png
