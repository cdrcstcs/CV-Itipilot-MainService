import Attraction from "./models/Attraction.js";
import Rating from "./models/Rating.js";
import Tag from "./models/Tag.js";
import User from "./models/User.js";
import Image from "./models/Images.js";
import Event from "./models/Event.js";
const tagList = [
    '#Travel',
    '#TravelPhotography',
    '#Wanderlust',
    '#AdventureTravel',
    '#SoloTravel',
    '#FamilyTravel',
    '#BudgetTravel',
    '#TravelTips',
    '#ExploreTheWorld',
    '#CulturalTravel',
    '#BucketListTravel',
    '#DigitalNomad',
    '#TravelBlog',
    '#LuxuryTravel',
    '#OffTheBeatenPath',
    '#TravelEssentials',
    '#RoadTrip',
    '#Backpacking',
    '#TravelInspiration',
    '#EcoTravel',
    '#TravelWithPets',
    '#VacationMode',
    '#HolidayTrip',
    '#TravelGoals',
    '#TravelDiaries',
    '#ExploreMore',
    '#Staycation',
    '#AdventureAwaits',
    '#TravelAddict',
    '#TravelDeeper',
    '#BeautifulDestinations',
    '#TravelerLife',
    '#TravelTheWorld',
    '#TravelAdventure',
    '#TravelLover',
    '#TravelAgency',
    '#TravelGram',
    '#TravelStyle',
    '#GlobalCitizen',
    '#WorldTraveler',
    '#NomadLife',
    '#TravelingSolo',
    '#ExploreLocal',
    '#TravelTogether',
    '#TravelGuide',
    '#TravelEurope',
    '#AsiaTravel',
    '#NorthAmericaTravel',
    '#TravelAfrica',
    '#SouthAmericaTravel',
];
const tagObjects = tagList.map(tag => ({ value: tag }));
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRatings = () => {
    const ratings = [];
    for (let i = 0; i < 20; i++) {
        const score = getRandomInt(1, 100);
        const rating = new { score };
        ratings.push(rating);
    }
    return ratings;
};
const ratingsData = generateRatings();
const generateRandomPhoneNumber = () => {
const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
return digits;
};
const generateUsers = () => {
    const users = [];
    const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "Brazil", "India", "South Africa"];
    const userTypes = ["ADMIN", "USER"];
    for (let i = 0; i < 20; i++) {
        const user= {
        imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: `password${i + 1}`,
        country: convertCountryToAbbreviation(countries[Math.floor(Math.random() * countries.length)]),
        phone: generateRandomPhoneNumber(),
        longtitude: getRandomInt(-180, 180),
        latitude: getRandomInt(-90, 90),
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        };
        users.push(user);
    }
    return users;
};

const countryMappings = {
    'United States': 'USA',
    'Canada': 'CAN',
    'United Kingdom': 'GBR',
    'Australia': 'AUS',
    'Germany': 'DEU',
    'Afghanistan': 'AFG',
    'Albania': 'ALB',
    'Algeria': 'DZA',
    'Andorra': 'AND',
    'Angola': 'AGO',
    'Antigua and Barbuda': 'ATG',
    'Argentina': 'ARG',
    'Armenia': 'ARM',
    'Austria': 'AUT',
    'Azerbaijan': 'AZE',
    'Bahamas': 'BHS',
    'Bahrain': 'BHR',
    'Bangladesh': 'BGD',
    'Barbados': 'BRB',
    'Belarus': 'BLR',
    'Belgium': 'BEL',
    'Belize': 'BLZ',
    'Benin': 'BEN',
    'Bhutan': 'BTN',
    'Bolivia': 'BOL',
    'Bosnia and Herzegovina': 'BIH',
    'Botswana': 'BWA',
    'Brazil': 'BRA',
    'Brunei': 'BRN',
    'Bulgaria': 'BGR',
    'Burkina Faso': 'BFA',
    'Burundi': 'BDI',
    'Cabo Verde': 'CPV',
    'Cambodia': 'KHM',
    'Cameroon': 'CMR',
    'Central African Republic': 'CAF',
    'Chad': 'TCD',
    'Chile': 'CHL',
    'China': 'CHN',
    'Colombia': 'COL',
    'Comoros': 'COM',
    'Congo': 'COG',
    'Costa Rica': 'CRI',
    'Croatia': 'HRV',
    'Cuba': 'CUB',
    'Cyprus': 'CYP',
    'Czechia': 'CZE',
    'Denmark': 'DNK',
    'Djibouti': 'DJI',
    'Dominica': 'DMA',
    'Dominican Republic': 'DOM',
    'Ecuador': 'ECU',
    'Egypt': 'EGY',
    'El Salvador': 'SLV',
    'Equatorial Guinea': 'GNQ',
    'Eritrea': 'ERI',
    'Estonia': 'EST',
    'Eswatini': 'SWZ',
    'Ethiopia': 'ETH',
    'Fiji': 'FJI',
    'Finland': 'FIN',
    'France': 'FRA',
    'Gabon': 'GAB',
    'Gambia': 'GMB',
    'Georgia': 'GEO',
    'Ghana': 'GHA',
    'Greece': 'GRC',
    'Grenada': 'GRD',
    'Guatemala': 'GTM',
    'Guinea': 'GIN',
    'Guinea-Bissau': 'GNB',
    'Guyana': 'GUY',
    'Haiti': 'HTI',
    'Honduras': 'HND',
    'Hungary': 'HUN',
    'Iceland': 'ISL',
    'India': 'IND',
    'Indonesia': 'IDN',
    'Iran': 'IRN',
    'Iraq': 'IRQ',
    'Ireland': 'IRL',
    'Israel': 'ISR',
    'Italy': 'ITA',
    'Jamaica': 'JAM',
    'Japan': 'JPN',
    'Jordan': 'JOR',
    'Kazakhstan': 'KAZ',
    'Kenya': 'KEN',
    'Kiribati': 'KIR',
    'Korea (North)': 'PRK',
    'Korea (South)': 'KOR',
    'Kosovo': 'XKX',
    'Kuwait': 'KWT',
    'Kyrgyzstan': 'KGZ',
    'Laos': 'LAO',
    'Latvia': 'LVA',
    'Lebanon': 'LBN',
    'Lesotho': 'LSO',
    'Liberia': 'LBR',
    'Libya': 'LBY',
    'Liechtenstein': 'LIE',
    'Lithuania': 'LTU',
    'Luxembourg': 'LUX',
    'Madagascar': 'MDG',
    'Malawi': 'MWI',
    'Malaysia': 'MYS',
    'Maldives': 'MDV',
    'Mali': 'MLI',
    'Malta': 'MLT',
    'Marshall Islands': 'MHL',
    'Mauritania': 'MRT',
    'Mauritius': 'MUS',
    'Mexico': 'MEX',
    'Micronesia': 'FSM',
    'Moldova': 'MDA',
    'Monaco': 'MCO',
    'Mongolia': 'MNG',
    'Montenegro': 'MNE',
    'Morocco': 'MAR',
    'Mozambique': 'MOZ',
    'Myanmar (Burma)': 'MMR',
    'Namibia': 'NAM',
    'Nauru': 'NRU',
    'Nepal': 'NPL',
    'Netherlands': 'NLD',
    'New Zealand': 'NZL',
    'Nicaragua': 'NIC',
    'Niger': 'NER',
    'Nigeria': 'NGA',
    'North Macedonia': 'MKD',
    'Norway': 'NOR',
    'Oman': 'OMN',
    'Pakistan': 'PAK',
    'Palau': 'PLW',
    'Palestine': 'PSE',
    'Panama': 'PAN',
    'Papua New Guinea': 'PNG',
    'Paraguay': 'PRY',
    'Peru': 'PER',
    'Philippines': 'PHL',
    'Poland': 'POL',
    'Portugal': 'PRT',
    'Qatar': 'QAT',
    'Romania': 'ROU',
    'Russia': 'RUS',
    'Rwanda': 'RWA',
    'Saint Kitts and Nevis': 'KNA',
    'Saint Lucia': 'LCA',
    'Saint Vincent and the Grenadines': 'VCT',
    'Samoa': 'WSM',
    'San Marino': 'SMR',
    'Sao Tome and Principe': 'STP',
    'Saudi Arabia': 'SAU',
    'Senegal': 'SEN',
    'Serbia': 'SRB',
    'Seychelles': 'SYC',
    'Sierra Leone': 'SLE',
    'Singapore': 'SGP',
    'Slovakia': 'SVK',
    'Slovenia': 'SVN',
    'Solomon Islands': 'SLB',
    'Somalia': 'SOM',
    'South Africa': 'ZAF',
    'South Sudan': 'SSD',
    'Spain': 'ESP',
    'Sri Lanka': 'LKA',
    'Sudan': 'SDN',
    'Suriname': 'SUR',
    'Sweden': 'SWE',
    'Switzerland': 'CHE',
    'Syria': 'SYR',
    'Taiwan': 'TWN',
    'Tajikistan': 'TJK',
    'Tanzania': 'TZA',
    'Thailand': 'THA',
    'Timor-Leste': 'TLS',
    'Togo': 'TGO',
    'Tonga': 'TON',
    'Trinidad and Tobago': 'TTO',
    'Tunisia': 'TUN',
    'Turkey': 'TUR',
    'Turkmenistan': 'TKM',
    'Tuvalu': 'TUV',
    'Uganda': 'UGA',
    'Ukraine': 'UKR',
    'United Arab Emirates': 'ARE',
    'Uruguay': 'URY',
    'Uzbekistan': 'UZB',
    'Vanuatu': 'VUT',
    'Vatican City': 'VAT',
    'Venezuela': 'VEN',
    'Vietnam': 'VNM',
    'Yemen': 'YEM',
    'Zambia': 'ZMB',
    'Zimbabwe': 'ZWE'
    // Add more country mappings as needed
  };
function convertCountryToAbbreviation(countryName) {
    return countryMappings[countryName] || countryName; // Return abbreviation or original name if not found
}
const usersData = generateUsers();
const generateAttractions = async () => {
    const attractions = [];
    const cities = ["New York", "London", "Paris", "Tokyo", "Sydney", "Rome", "Dubai", "Barcelona", "Berlin", "Rio de Janeiro"];
    const tags =  (await Tag.find()).map(({_id})=>{
        return _id;
    });
    const ratings =  (await Rating.find()).map(({_id})=>{
        return _id;
    });
    for (let i = 0; i < 20; i++) {
      const attraction = {
        imageId: imageIds[getRandomInt(0, imageIds.length - 1)],
        name: `Attraction ${i + 1}`,
        address: `Address ${i + 1}`,
        x: getRandomInt(-180, 180),
        y: getRandomInt(-90, 90),
        tagIds: [tags[getRandomInt(0, tags.length - 1)],tags[getRandomInt(0, tags.length - 1)],tags[getRandomInt(0, tags.length - 1)]],
        ratingId: ratings[getRandomInt(0, ratings.length - 1)],
        city: cities[getRandomInt(0, cities.length - 1)],
      };
      attractions.push(attraction);
    }
    return attractions;
};
const attractionsData = generateAttractions();
const imageIds = (await Image.find()).map(({_id})=>{
    return _id;
})
const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  // Generate 20 random events
  const generateEvents = (attractionIds) => {
    const events = [];
    const descriptions = [
      "Annual Festival",
      "Workshop Session",
      "Concert",
      "Cultural Event",
      "Art Exhibition",
      "Food Festival",
      "Sports Event",
      "Educational Seminar",
      "Charity Event",
      "Fashion Show",
      "Tech Conference",
    ];
    
    for (let i = 0; i < 20; i++) {
      const attractionId = attractionIds[Math.floor(Math.random() * attractionIds.length)];
      const startTime = getRandomDate(new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
      const endTime = new Date(startTime.getTime() + Math.random() * (24 * 60 * 60 * 1000)); // Random duration up to 24 hours
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
      const event = {
        startTime,
        endTime,
        attractionId,
        description,
      };
      events.push(event);
    }
    return events;
};
const attractionIds = (await Attraction.find()).map(({_id})=>{
    return _id;
});
const eventsData = generateEvents(attractionIds);
  // Generate 20 random itineraries
const generateItineraries = (userIds, eventIds) => {
    const itineraries = [];
    const titles = [
      "Weekend Getaway",
      "City Exploration",
      "Adventure Trip",
      "Cultural Tour",
      "Road Trip",
      "Family Vacation",
      "Hiking Expedition",
      "Beach Retreat",
      "Foodie Adventure",
      "Skiing Holiday",
      "Solo Backpacking",
      "Historical Journey",
      "Art and Architecture Tour",
      "Nature Escapade",
      "Wellness Retreat",
      "Festival Experience",
      "Business Travel",
      "Photography Tour",
      "Bucket List Journey",
      "Volunteer Mission",
    ];
    
    for (let i = 0; i < 20; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const title = titles[Math.floor(Math.random() * titles.length)];
      const name = `${title} - ${i + 1}`;
      const startTime = getRandomDate(new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
      const endTime = new Date(startTime.getTime() + Math.random() * (7 * 24 * 60 * 60 * 1000)); // Random duration up to 7 days
      const eventIdsSubset = eventIds.slice(0, Math.floor(Math.random() * eventIds.length) + 1); // Random subset of eventIds
  
      const itinerary = {
        title,
        name,
        userId,
        startTime,
        endTime,
        eventIds: eventIdsSubset,
      };
      itineraries.push(itinerary);
    }
    return itineraries;
};
  
const userIds =  (await User.find()).map(({_id})=>{
    return _id;
});
const eventIds = (await Event.find()).map(({_id})=>{
    return _id;
});
const itinerariesData = generateItineraries(userIds, eventIds);
const imageUrls = [
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg",
    "9.jpeg",
    "10.jpeg",
];
const generateImageData = () => {
    const imageData = [];

    for (let i = 0; i < 20; i++) {
        const image = imageUrls[i % imageUrls.length]; // Cycling through sample URLs
        const imageEntry = { image };
        imageData.push(imageEntry);
    }
    return imageData;
};
  
const imagesData = generateImageData();
export {usersData, attractionsData, tagObjects, ratingsData, eventsData, itinerariesData, imagesData};