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
        const rating = new Rating({ score });
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
        const user = new User({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: `password${i + 1}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        phone: generateRandomPhoneNumber(),
        longtitude: getRandomInt(-180, 180),
        latitude: getRandomInt(-90, 90),
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        });
        users.push(user);
    }
    return users;
};
const usersData = generateUsers();
const generateAttractions = () => {
    const attractions = [];
    const cities = ["New York", "London", "Paris", "Tokyo", "Sydney", "Rome", "Dubai", "Barcelona", "Berlin", "Rio de Janeiro"];
    const tags = [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
    ]; // Replace with actual tag ObjectId references
    const ratings = [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
    ]; // Replace with actual rating ObjectId references
  
    for (let i = 0; i < 20; i++) {
      const attraction = new Attraction({
        imageId: new mongoose.Types.ObjectId(), // Replace with actual image ObjectId reference
        name: `Attraction ${i + 1}`,
        address: `Address ${i + 1}`,
        x: getRandomInt(-180, 180),
        y: getRandomInt(-90, 90),
        tagIds: [tags[getRandomInt(0, tags.length - 1)]],
        ratingId: ratings[getRandomInt(0, ratings.length - 1)],
        city: cities[getRandomInt(0, cities.length - 1)],
      });
  
      attractions.push(attraction);
    }
  
    return attractions;
};
const attractionsData = generateAttractions();