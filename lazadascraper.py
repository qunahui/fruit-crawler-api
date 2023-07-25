from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import undetected_chromedriver as uc
import time
import sys
import random
from string import ascii_letters, digits
def lazadareturnimages(query):
    driver = uc.Chrome(headless=True)
    val = "https://www.lazada.vn/tag/"+ str(query) +"/?q="+str(query)+"&_keyori=ss&from=input&spm=a2o4n.home.search.go.19053bdcyV0M1A&catalog_redirect_tag=true"
    wait = WebDriverWait(driver, 10)
    driver.get(val)
    get_url = driver.current_url
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
    shoplist = []
    namelist = []
    pricelist= []
    ids= []
    imglist=[]
    li = soup.find_all('div', {'class': 'picture-wrapper'})
    li = li[:5]
    for i in li:
        namelist.append(i.find_all("img")[0]['alt'])
        imglist.append(i.find_all("img")[0]['src'])
    prices = soup.find_all("div",{"data-qa-locator":"product-item"})
    for i in prices:
        pricelist.append(i.find_all("div")[8].contents[0].contents[0])
    prices = prices[:5]
    for i in range(5):
        ids.append(i)
        shoplist.append("lazada")
        namelist[i] = ''.join([random.choice(ascii_letters + digits) for i in range(8)]) 
        pricelist[i] = ''.join([random.choice(ascii_letters + digits) for i in range(8)]) 
    returnlist = []
    for i in range(5):
        returnlist.append({"id":ids[i], "names": namelist[i], "prices": pricelist[i], "stores": shoplist[i], "links":imglist[i]})
    print(returnlist)
    return returnlist
if sys.argv[1] == 'first_function':
    lazadareturnimages(sys.argv[2])
sys.stdout.flush()
