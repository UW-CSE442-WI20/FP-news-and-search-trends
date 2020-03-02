import csv

newsTopicTerms = ["Area 51 raid", "Baby Yoda", "Boeing 737 crashes",
  "California earthquake", "California wildfires", "Christchurch shooting",
  "Coco Gauff", "College Football Playoff", "Dayton shooting",
  "El Paso shooting", "Equifax data breach", "FIFA Women's World Cup",
  "government shutdown", "Greta Thunberg", "Hurricane Dorian", "Katelyn Ohashi",
  "Lori Loughlin college scandal", "MLS Cup", "Muller Report",
  "NCAA Men's Division I Basketball Tournament", "Notre Dame fire",
  "Stanley Cup", "Super Bowl LIII", "The NBA Finals", "Tiger Woods Masters",
  "Trump impeachment", "vaping", "World Series"]

files = ["Area_51_raid.csv", "Baby_Yoda.csv", "Boeing_737_crashes.csv", "California_earthquake.csv", "California_wildfires.csv", "Christchurch_shooting.csv", "Coco_Gauff.csv", "College_Football_Playoff.csv", "Dayton_shooting.csv", "El_Paso_shooting.csv", "Equifax_data_breach.csv", "FIFA_Women's_World_Cup.csv", "government_shutdown.csv", "Greta_Thunberg.csv", "Hurricane_Dorian.csv", "Katelyn_Ohashi.csv", "Lori_Loughlin_college_scandal.csv", "MLS_Cup.csv", "Muller_Report.csv", "NCAA_Men's_Division_I_Basketball_Tournament.csv", "Notre_Dame_fire.csv", "Stanley_Cup.csv", "Super_Bowl_LIII.csv", "The_NBA_Finals.csv", "Tiger_Woods_Masters.csv", "Trump_impeachment.csv", "vaping.csv", "World_Series.csv"]

with open('static/news_topics_2019.csv', mode='w', newline='') as write_file:
    writer = csv.writer(write_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['topic', 'Week', 'interest'])
    for i,file in enumerate(files):
        with open('static/news_topics_2019/' + file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count != 0:
                    row.insert(0, newsTopicTerms[i])
                    writer.writerow(row)
                line_count += 1
            print('Processed', file)