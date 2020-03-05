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
topics = ["California Earthquake", "Equifax data breach", "government shutdown", "El Paso shooting", "Dayton shooting","Area 51 raid", "Womens World Cup","Hurricane Dorian", "Notre Dame fire",
 "Christchurch shooting","Trump impeachment", "Lori Loughlin scandal","Boeing 737 crash","Super Bowl LIII", "California wildfires", "Katelyn Ohashi","march madness", 
 "NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]

#topics = ["The NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]
#List of search terms, but can only do 5 at a time. 
#kw_list = ["California Earthquake", "government shutdown"]
"""
,"Equifax data breach", "government shutdown", "El Paso shooting", "Dayton shooting","Area 51 raid", "Womens World Cup","Hurricane Dorian", "Notre Dame fire",
 "Christchurch shooting","Trump impeachment", "Lori Loughlin college scandal","Boeing 737 crashes","Super Bowl LIII", "California wildfires", "Katelyn Ohashi","NCAA Men's Division I Basketball Tournament", 
 "The NBA Finals", "Tiger Woods Masters", "Stanley Cup", "Greta Thunberg","Coco Gauff", "World Series", "vaping", "Muller Report", "Baby Yoda","College Football Playoff", "MLS Cup"   ]
"""


dd = defaultdict(list)
for topic in topics: 
  topic = topic.replace(" ", "_")

  input = 'trends1_%s.csv' % topic
  #outputname = 'trends1_%s.csv' % topic
  outputname = 'trends_locations_%s.csv' % topic
  with open(input, 'r') as inp, open(outputname, 'w') as out:
    writer = csv.writer(out)
    count = 1
    for row in csv.reader(inp):
      if count != 2: 
        if row[1] == "interest": 

          row.append("lat")
          row.append("long")
          writer.writerow(row)
        if row[1] != "interest": 
        
          
          print(row[2])
          location = row[0]
          key = dd.get(location, 'no')
          if( key == 'no'):
            #coords = geolocator.geocode(location, timeout = None)
            coords = geolocator.geocode(location)
            dd[location].append(coords.latitude)
            dd[location].append(coords.longitude)
            row.append(coords.latitude)
            row.append(coords.longitude)
          else:
            row.append(dd[location][0])
            row.append(dd[location][1])
          
          writer.writerow(row)
      count = count + 1  
    
        
      #writer.writerow(row)

  

