from pytrends.request import TrendReq
import pprint
import pdb
import certifi
import ssl
import time
import geopy.geocoders
from geopy.geocoders import Nominatim
ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx
#geolocator = Nominatim(scheme='http')

geopy.geocoders.options.default_user_agent = "my-application"
geopy.geocoders.options.default_timeout = 7
geolocator = Nominatim()
import pandas as pd
import sys
import pandas as pd
import numpy as np
import requests
import io
from io import BytesIO
from io import StringIO 
import csv
import datetime
import json
import sys
from importlib import reload
from collections import defaultdict






# Configure pprint
pp = pprint.PrettyPrinter(depth=10)

# Configure pytrends
#tz is timezone offset, 360 is central time. 
pytrends = TrendReq(hl='en-US', tz=360)

"""
topics = ["California Earthquake", "Equifax data breach", "government shutdown", "El Paso shooting", "Dayton shooting","Area 51 raid", "Womens World Cup","Hurricane Dorian", "Notre Dame fire",
 "Christchurch shooting","Trump impeachment", "Lori Loughlin scandal","Boeing 737 crash","Super Bowl LIII", "California wildfires", "Katelyn Ohashi", "march madness", 
 "NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]
"""
topics = ["California Earthquake", "Equifax data breach", "government shutdown", "El Paso shooting", "Dayton shooting","Area 51 raid", "Womens World Cup","Hurricane Dorian", "Notre Dame fire",
 "Christchurch shooting","Trump impeachment", "Lori Loughlin scandal","Boeing 737 crash","Super Bowl LIII", "California wildfires", "Katelyn Ohashi","march madness", 
 "NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]


#List of search terms, but can only do 5 at a time. 
#kw_list = ["California Earthquake"]
"""
,"Equifax data breach", "government shutdown", "El Paso shooting", "Dayton shooting","Area 51 raid", "FIFA Women’s World Cup","Hurricane Dorian", "Notre Dame fire",
 "Christchurch shooting","Trump impeachment", "Lori Loughlin college scandal","Boeing 737 crashes","Super Bowl LIII", "California wildfires", "Katelyn Ohashi","NCAA Men's Division I Basketball Tournament", 
 "The NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]


start_date = datetime.date(2019,1,1)
end_date = datetime.date(2019,1,6)

stop_date = datetime.date(2020, 1,1)
trends = pd.DataFrame()
dd = defaultdict(list)
#https://colab.research.google.com/github/aksh98/FintechProject/blob/master/DataExtraction_GoogleTrends.ipynb#scrollTo=E_yH6cOYOYOg
while(end_date < stop_date):
  timeframeString = start_date.strftime('%Y-%m-%d')+' '+ end_date.strftime('%Y-%m-%d')
  print("DATE:",timeframeString)
 # time.sleep(10)
  # cat is categories and 0 is all categories
  #timeframe is dates
  #gprop is What Google property to filter to, like images, shopping, etc. defaults to websearch. 
  pytrends.build_payload(kw_list, cat=0, timeframe=timeframeString, geo='US', gprop='')

  #resolution 'DMA' returns Metro level data
  #inc_low_vol True/False (includes google trends data for low volume countries/regions as well)

  regionData = pytrends.interest_by_region(resolution='DMA', inc_low_vol=True, inc_geo_code=False)
  pp.pprint(regionData)
  df = pd.DataFrame(regionData)
  df['date'] = start_date
  trends = trends.append(df)
  start_date = end_date
  start_date+=datetime.timedelta(1)
  end_date += datetime.timedelta(7)

query = kw_list[0]
query = query.replace(" ", "_")
#name = 'trends_%s.csv' % query
name = 'trends.csv'
trends.to_csv(name)



input = 'trends.csv' 
#query = kw_list[0]
#query.replace(" ", "_")
outputname = 'trends_%s.csv' % query
with open(input, 'r') as inp, open(outputname, 'w') as out:
  writer = csv.writer(out)
  for row in csv.reader(inp):
    if row[1] == kw_list[0]: 
      row[1] = "interest"
      writer.writerow(row)
    if row[1] != "0": 
      
      
      writer.writerow(row)

"""

dd = defaultdict(list)
for topic in topics: 
  topic = topic.replace(" ", "_")

  states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
  #query = kw_list[0]
  query = topic
  input = 'trends_%s.csv' % query
  outputname = 'trends1_%s.csv' % query
  #outputname = 'trends_locations_%s.csv' % topic
  with open(input, 'r') as inp, open(outputname, 'w') as out:
    writer = csv.writer(out)
    for row in csv.reader(inp):
      if row[1] == "interest": 

        
        writer.writerow(row)
      if row[1] != "interest": 
        location = row[0]
        
        
        dash = location.find('-')
        if (dash == -1): 
          dash = 1000
        other = location.find('&')
        if (other == -1): 
          other = 1000
        paren = location.find('(')
        if (paren == -1): 
          paren = 1000
        first = min(dash, other, paren)
        if (first != 1000):
          stateCode = location[(first-3):first]
          stateCode = stateCode.strip()
          if stateCode in states: 
            if (stateCode.isupper()):
              location = location[0:first]
              location = location.strip()
              location = location 
            else: 
              newStateCode = location[(len(location)-2):len(location)]
              location = location[0:first]
              location = location.strip()
              location = location + ' ' + newStateCode 
          else: 
            newStateCode = location[(len(location)-2):len(location)]
            location = location[0:first]
            location = location.strip()
            location = location + ' ' + newStateCode 

        """
        if (dash != -1):
          stateCode = location[(dash-3):dash]
          stateCode = stateCode.strip()
          if stateCode in states: 
            if (stateCode.isupper()):
              location = location[0:dash]
              location = location.strip()
              location = location 
            else: 
              newStateCode = location[(len(location)-2):len(location)]
              location = location[0:dash]
              location = location.strip()
              location = location + ' ' + newStateCode 
          else: 
            newStateCode = location[(len(location)-2):len(location)]
            location = location[0:dash]
            location = location.strip()
            location = location + ' ' + newStateCode 
        elif (other != -1):
          stateCode = location[(other-3):other]
          stateCode = stateCode.strip()
          if stateCode in states: 
            if (stateCode.isupper()):
              location = location[0:other]
              location = location.strip()
              location = location 
            else: 
              newStateCode = location[(len(location)-2):len(location)]
              location = location[0:other]
              location = location.strip()
              location = location + ' ' + newStateCode 
          else: 
            newStateCode = location[(len(location)-2):len(location)]
            location = location[0:other]
            location = location.strip()
            location = location + ' ' + newStateCode 
        elif (paren != -1):
          stateCode = location[(paren-3):paren]
          stateCode = stateCode.strip()
          if stateCode in states: 
            if (stateCode.isupper()):
              location = location[0:paren]
              location = location.strip()
              location = location 
            else: 
              newStateCode = location[(len(location)-2):len(location)]
              location = location[0:paren]
              location = location.strip()
              location = location + ' ' + newStateCode 
          else: 
            newStateCode = location[(len(location)-2):len(location)]
            location = location[0:paren]
            location = location.strip()
            location = location + ' ' + newStateCode 
        """
        location = location + ' USA'
        row[0] = location
        
        
        writer.writerow(row)
        
      
          
        #writer.writerow(row)



