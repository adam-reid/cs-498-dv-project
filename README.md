# CS-498 Final Project

## Distribution of Transportation Fatalities by Mode

### Metadata

* Source: [Bureau of Transportation Statistics](https://www.bts.dot.gov/content/distribution-transportation-fatalities-mode)
* File: [table_02_04q18.xlsx](https://www.bts.dot.gov/sites/bts.dot.gov/files/table_02_04q418.xlsx)
* Date Last Accessed: 2 August 2019
* Key:
  * **N** = data do not exist
  * **N/A** = not applicable;
  * **P** = preliminary;
  * **R** = revised.


### Provenance

Transformation steps are as follows:
1. Clean
    1. Remove Percentage columns
    1. Add Year row.
    1. Leave **N** for filtering in csv step.
    1. Keep **R** data as value only.
    1. Keep all **P** data (all 2017).
1. CSV
    1. Transpose data into records keyed by year.
    1. Coerce all data to numerical type.
    1. Replace **N** as `0` in transpose tab.
    1. Export as CSV


## Data source foot notes

a. Light trucks are defined as trucks of 10,000 pounds gross vehicle weight rating or less, including pickups, vans, truck-based station wagons, and utility vehicles. Large trucks are defined as trucks over 10,000 pounds gross vehicle weight rating, including single-unit trucks and truck tractors.
b. Includes occupants of other vehicle types, other nonmotorists, and unknown. For 1960-70, the U.S. Department of Transportation, National Highway Traffic Safety Administration did not break out fatality data to the same level of detail as in later years, so fatalities for those years also include occupants of passenger cars, trucks, and buses.
c. Recreational includes airboats, canoes, kayaks, motorboats, pontoon, rowboats, and sailboats. Data are based on information provided by the States, the District of Columbia and the five U.S. Territories to the Coast Guard Boating Accident Report Database (BARD) system, which is subject to some under- or delayed reporting.
d. All operations other than those operating under 14 CFR 121 and 14 CFR 135.
e. Passenger includes passenger ships, research ships, and schools ships and include only closed cases where vessels were involved in a marine casualty as of April 6, 2015. Open cases by fiscal year not included above: CY 2002 = 0, CY 2003 = 5, CY 2004 = 5, CY 2005 = 8, CY 2006 = 4, CY 2007 = 7, CY 2008 = 19, CY 2009 = 38, CY 2010 = 36, CY 2011 = 120, CY 2012 = 644, CY 2013 = 727, and CY 2014 = 742.
f. Other incidents are events other than Train Accidents or Crossing Incidents that cause physical harm to persons.
g. Nonscheduled service operating under 14 CFR 135 (On-demand air taxis).
h. Industrial/other includes fishing vessels, miscellaneous vessels, and offshore include only closed cases where vessels were involved in a marine casualty as of April 6, 2015. Open cases by fiscal year not included above: CY 2002 = 0, CY 2003 = 5, CY 2004 = 5, CY 2005 = 8, CY 2006 = 4, CY 2007 = 7, CY 2008 = 19, CY 2009 = 38, CY 2010 = 36, CY 2011 = 120, CY 2012 = 644, CY 2013 = 727, and CY 2014 = 742.
i. All service operating under 14 CFR 121 (Scheduled air carriers). Since Mar. 20, 1997, 14 CFR 121 includes only aircraft with 10 or more seats formerly operated under 14 CFR 135. This change makes it difficult to compare pre-1997 data for 14 CFR 121 and 14 CFR 135  with more recent years' data.
j. Freight includes barges, bulk carriers, general dry cargo ships, refrigerated cargo ships, roll-on/roll-off ships, tank ships, and towing ships and include only closed cases where vessels were involved in a marine casualty as of April 6, 2015. Open cases by fiscal year not included above: CY 2002 = 0, CY 2003 = 5, CY 2004 = 5, CY 2005 = 8, CY 2006 = 4, CY 2007 = 7, CY 2008 = 19, CY 2009 = 38, CY 2010 = 36, CY 2011 = 120, CY 2012 = 644, CY 2013 = 727, and CY 2014 = 742.
k. All scheduled service operating under 14 CFR 135 (Commuter air carriers). Before Mar. 20, 1997, 14 CFR 135 applied to aircraft with 30 or fewer seats. Since March 20, 1997, 14 CFR 135 includes only aircraft with fewer than 10 seats. This change makes it difficult to compare pre-1997 data for 14 CFR 121 and 14 CFR 135  with more recent years' data.

## NOTES

To reduce double counting, the following adjustments are made to Total Fatalities: For Railroad, fatalities involving motor vehicles at public highway-rail grade crossings are excluded because such fatalities are assumed to be included in Highway fatalities. For Transit, non-rail modes, including aerial tramway, motor bus, bus rapid transit, commuter bus, demand response, demand taxi, ferryboat, jitney, publico, trolleybus, and vanpool fatalities are excluded because they are counted as Water and Highway fatalities. Other counts, redundant with above help eliminate double counting in the Total Fatalities.
Highway fatalities data prior to 1975 have been adjusted to reflect the Fatality Analysis Reporting System's definition of a fatal crash as one that involves a motor vehicle on a traffic way that results in the death of a vehicle occupant or a nonmotorist within 30 days of the crash.
Water injury data for 2001 and before is not comparable with later year due to a change in the reporting system.
Current version of this table is not comparable with the versions before 2014 because of the categories changing for some modes.

## SOURCES
### Air:
#### U.S. Air Carrier:
1960: National Transportation Safety Board, Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1967 (Washington, DC: December 1968).
1965-70: Ibid., Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1975, NTSB/ARC-77/1 (Washington, DC: January 1977).
1975: Ibid., Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1983, NTSB/ARC-87/01 (Washington, DC: February 1987), table 18.
1980: Ibid., Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1981, NTSB/ARC-85/01 (Washington, DC: February 1985), tables 2 and 16.
1985-2017: Ibid., Aviation Accident Statistics (Washington, DC: Annual Issues), table 5, available at http://www.ntsb.gov/investigations/data/pages/aviation_stats.aspx as of Nov. 7, 2018.
#### Commuter:
1975-80: National Transportation Safety Board, Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1980, NTSB/ARC-83/01 (Washington, DC: January 1983), tables 26 and 40.
1985-2016: Ibid., Aviation Accident Statistics (Washington, DC: Annual Issues), table 8, available at http://www.ntsb.gov/investigations/data/pages/aviation_stats.aspx as of Nov. 7, 2018..
#### On-demand air taxi:
1975-80: National Transportation Safety Board, Annual Review of Aircraft Accident Data: U.S. Air Carrier Operations, Calendar Year 1981, NTSB/ARC-85/01 (Washington, DC: February 1985), table 61.
1985-2017: Ibid., Aviation Accident Statistics (Washington, DC: Annual Issues), table 9, available at http://www.ntsb.gov/investigations/data/pages/aviation_stats.aspx as of Nov. 7, 2018.
#### General aviation:
1960-70: National Transportation Safety Board, Annual Review of Aircraft Accident Data: U.S. General Aviation, Calendar Year 1970, NTSB/ARG-74/1 (Washington, DC: April 1974), table 117.
1975-80: Ibid., Annual Review of Aircraft Accident Data: General Aviation, Calendar Year 1985, NTSB/ARG-87/03 (Washington, DC: October 1987), table 21.
1985-2017: Ibid., Aviation Accident Statistics (Washington, DC: Annual Issues),  table 10, available at http://www.ntsb.gov/investigations/data/pages/aviation_stats.aspx as of Nov. 7, 2018.
### Highway:
1960-65:  U.S. Department of Transportation, National Highway Traffic Safety Administration from data supplied by U.S. Department of Health and Human Services, National Center for Health Statistics, and individual state accident reports (adjusted to 30-day deaths).
1970: U.S. Department of Transportation, National Highway Traffic Safety Administration, Traffic Safety Facts (Annual Editions), Table 4, available at http://www-nrd.nhtsa.dot.gov/cats/index.aspx as of Oct. 2017.
1975-2017: U.S. Department of Transportation, National Highway Traffic Safety Administration, Personal Comunication, Oct. 16, 2018.
### Rail:
#### Highway-rail grade crossing:
1975-13: U.S. Department of Transportation, Federal Railroad Administration, Office of Safety Analysis, table 5.11, Hwy/Rail Incidents Summary Tables, available at http://safetydata.fra.dot.gov/OfficeofSafety/ as of July 2015.
2014-17: U.S. Department of Transportation, Federal Railroad Administration, Office of Safety Analysis, table 5.14, Hwy Rail Accident Incident Summary By Railroad, available at http://safetydata.fra.dot.gov/OfficeofSafety/ as of Nov. 7, 2018.
#### Railroad:
1960-65: National Safety Council, Accident Facts, 1974 (Washington, DC: 1974).
1970: U.S. Department of Transportation, Federal Railroad Administration, Highway-Rail Crossing Accident/Incident and Inventory Bulletin (Washington, DC: Annual Issues), table 7.
1975-2017: Ibid., U.S. Department of Transportation, Federal Railroad Administration, Office of Safety Analysis, table 1.12, 1.13, 2.07, and 5.14 , available at http://safetydata.fra.dot.gov/OfficeofSafety/ as of Nov. 7, 2018.
### Transit:
1990-01:  U.S. Department of Transportation, Volpe Center, Transit Safety and Security Statistics, available at http://transit-safety.volpe.dot.gov/data/samis.aspx as of Mar. 2015.
2002-17:  U.S. Department of Transportation, Federal Transit Administration, National Transportation Database, Safety & Security Time Series Data (Washington, DC: Monthly Issues) available at https://www.transit.dot.gov/ntd/ntd-data as of Oct. 11. 2018.
### Water:
#### Passenger, Freight, Industrial/Other:
2002-2017: U.S Department of Homeland Security, U.S. Coast Guard, Office of Investigations and Analysis, Compliance Analysis Division, personal communication, Nov. 20, 2012 and Nov. 12, 2013, Aug. 31, 2015, May 2016, July 2017, and Aug. 16, 2018.
#### Recreational:
1960-02: U.S. Department of Homeland Security, U.S. Coast Guard, Office of Boating Safety, Boating Statistics (Washington, DC: Annual Issues), table 31, available at http://www.uscgboating.org as of Jun. 2014.
2003-17: U.S. Department of Homeland Security, U.S. Coast Guard, Recreational Boating Statistics (annual issues), available at www.uscgboating.org as of Nov. 7, 2018.
### Pipeline:
#### Hazardous liquid and gas pipeline:
1970-85: U.S. Department of Transportation, Research and Special Programs Administration, Office of Pipeline Safety, Accident and Incident Summary Statistics by Year, available at http://ops.dot.gov as of Nov. 18, 2003.
1990-2017: U.S. Department of Transportation, Pipeline and Hazardous Materials Safety Administration, Office of Pipeline Safety, Accident and Incident Summary Statistics by Year, available at http://phmsa.dot.gov/pipeline as of Nov. 7, 2018.
