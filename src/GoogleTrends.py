from pytrends.request import TrendReq
import sys

# Login to Google. Only need to run this once, the rest of requests will use the same session.
pytrend = TrendReq()

kw_string = ''
for arg in sys.argv:
    kw_string += arg + '_'
kw_string = kw_string[kw_string.index('_') + 1 : len(kw_string) - 1].replace(' ', '_')



# Create payload and capture API tokens. Only needed for interest_over_time(), interest_by_region() & related_queries()
pytrend.build_payload(kw_list=sys.argv[1:], geo='US')

# Interest Over Time
df = pytrend.interest_over_time()
df = df.reset_index(level='date').drop(columns='isPartial')
df = df[df['date'] < '2020']
df = df[df['date'] >= '2019']
df = df.set_index('date')
df.to_csv('../static/%s.csv' % kw_string)
