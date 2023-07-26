from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time
import sys
import random
from string import ascii_letters, digits
def shopeegenerateimages(query):
    from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import time
import sys
import random
from string import ascii_letters, digits
def shopeegenerateimages(query):
    from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import codecs
import re
import time
import undetected_chromedriver as uc
import undetected_chromedriver as uc 

def shopeegenerateimages(query):
    driver=uc.Chrome(headless=True)
    val = "https://shopee.vn/search?keyword="+ str(query)
    wait = WebDriverWait(driver, 10)
    driver.get(val)
    get_url = driver.current_url
    time.sleep(10)
    wait.until(EC.url_to_be(val))
    x=0
    while True:
        x+=1
        driver.execute_script("window.scrollBy(0,50)")
        time.sleep(.5)
        if x>8:
            break
    if get_url == val:
        page_source = driver.page_source
    soup = BeautifulSoup(page_source,features='html.parser')
    li = soup.find_all('div', {'style': 'pointer-events: none;'})
    imglist = []
    namelist = []
    idlist =[]
    ids = 6
    shoplist = []
    pricelist = []
    counter =0
    for i in range(len(li)):
        try:
            getActualResult = (li[i].parent.parent.parent.parent["data-sqe"])
        except:
            getActualResult = "nope"
        if getActualResult == "item" and counter<5:
            li[i] = li[i].find_all('img')[0]
            imglist.append(li[i]["src"])
    #             namelist.append(li[i]["alt"])
            idlist.append(ids)
            ids +=1
            namelist.append(''.join([random.choice(ascii_letters + digits) for b in range(8)]))
            pricelist.append(''.join([random.choice(ascii_letters + digits) for b in range(8)]))
            shoplist.append("shopee")
            counter+=1
    #     for el in soup.select("[aria-label='item_card_current_price_webfe_accessibility']"):
    #         parent = el.parent
    #         pricelist.append(parent.text)
    driver.close()
    returnlist = []
    for i in range((len(namelist))):
        returnlist.append({"id":idlist[i], "names": namelist[i], "prices": pricelist[i], "stores": shoplist[i], "links":imglist[i]})
    print(returnlist)
    return returnlist
if sys.argv[1] == 'first_function':
    shopeegenerateimages(sys.argv[2])
sys.stdout.flush()
