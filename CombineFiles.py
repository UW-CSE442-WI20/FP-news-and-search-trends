import csv

# switches made:
# Boeing <-> Lori
# Mueller <-> NCAA
# Notre Dame <-> Tiger
# CA earthquake <-> Coco
# Dayton <-> El Paso
# CA wildfires <-> World Series
# CFP <-> MLS
# Lori <-> Christchurch
# Mueller <-> Stanley
# CA earthquake <-> FIFA
# Area 51 <-> vaping
# Dayton <-> Equifax, El Paso <-> Equifax
# Coco <-> Hurricane; CA earthquake <-> Coco
# Greta <-> CFP
# Katelyn <-> Stanley, NBA <-> Boeing, Katelyn <-> Mueller
# Lori <-> NCAA
# Mueller <-> Tiger

newsTopicTerms = ["vaping", "Baby Yoda", "Christchurch shooting",
  "Hurricane Dorian", "World Series", "NCAA Men's Division I Basketball Tournament",
  "FIFA Women's World Cup", "MLS Cup", "Equifax data breach",
  "El Paso shooting", "Dayton shooting", "Coco Gauff",
  "government shutdown", "College Football Playoff", "California earthquake", "Stanley Cup",
  "The NBA Finals", "Greta Thunberg", "Lori Loughlin college scandal",
  "Tiger Woods Masters", "Mueller Report",
  "Katelyn Ohashi", "Super Bowl LIII", "Boeing 737 crashes", "Notre Dame fire",
  "Trump impeachment", "Area 51 raid", "California wildfires"]

with open('static/news_topics_2019.csv', mode='w', newline='') as write_file:
    writer = csv.writer(write_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['topic', 'Week', 'interest'])
    for i,topic in enumerate(newsTopicTerms):
        file = topic.replace(' ', '_') + '.csv'
        with open('static/news_topics_2019/' + file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count != 0:
                    row.insert(0, newsTopicTerms[i])
                    writer.writerow(row)
                line_count += 1
            print('Processed', file)