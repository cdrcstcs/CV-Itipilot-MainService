import Itinerary from '../models/Itinerary.js';
import Event from '../models/Event.js';
const getFullyPopulatedItineraries = async () => {
    try {
        // Fetch all itineraries
        const itineraries = await Itinerary.find();

        // Populate events for each itinerary
        await Promise.all(itineraries.map(async (itinerary) => {
            await Event.populate(itinerary, {
                path: 'eventIds',
                populate: {
                    path: 'attractionId',
                    populate: {
                        path: 'tagIds'
                    }
                }
            });
        }));
        // console.log(itineraries);
        // Return fully populated itineraries
        return itineraries;
    } catch (error) {
        console.error("Error fetching fully populated itineraries:", error);
        throw error; // or handle as needed
    }
};
const searchItinerary = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || "";
        const selectedTags = req.query.selectedTags || [];
        const sortOption = req.query.sortOption || "earliest";
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = 6;
        const skip = (page - 1) * pageSize;
        let itineraries = await getFullyPopulatedItineraries();
        if (searchQuery) {
            itineraries = itineraries.filter(iti => iti.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (selectedTags.length > 0) {
            itineraries = itineraries.filter(iti => {
                return iti.eventIds.some(event => {
                    return event.attractionId.tagIds.some(tag => selectedTags.includes(tag.value.toString()));
                });
            });
        }

        itineraries.sort((a, b) => {
            const aStartTime = Math.min(...a.eventIds.map(event => event.startTime));
            const bStartTime = Math.min(...b.eventIds.map(event => event.startTime));
            return sortOption === 'earliest' ? (aStartTime - bStartTime) : (bStartTime - aStartTime);
        });

        // Count total filtered itineraries
        const total = itineraries.length;

        // Pagination
        const results = itineraries.slice(skip, skip + pageSize);

        // Prepare response object with paginated data
        const response = {
            data: results,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };

        // Send response as JSON
        res.json(response);
    } catch (error) {
        console.error("Error searching itineraries:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { searchItinerary };