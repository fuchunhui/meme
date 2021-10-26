# coding:utf-8
import sys
import cv2

# bmp 转换为jpg
def bmpToJpg():
    path = targetDir + '/' + fileName
    image = cv2.imread(path + '.bmp')
    cv2.imwrite(path + '.jpg', image)

def main():
    bmpToJpg()

if __name__ == '__main__':
    targetDir = sys.argv[1]
    fileName = sys.argv[2]

    main()
