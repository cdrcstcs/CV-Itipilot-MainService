import Itinerary from "../models/Itinerary";
const searchItinerary = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || "";
        const selectedTags = req.query.selectedTags || [];
        const sortOption = req.query.sortOption || "earliest";
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = 4;
        const skip = (page - 1) * pageSize;
        let query = Itinerary.find();
        query = query.populate('eventIds').populate('attractionId').populate('tagIds');
        if (searchQuery) {
            query = query.find({ title: { $regex: searchQuery, $options: 'i' } });
        }
        if (selectedTags.length > 0) {
            query = query.find({ 'tagIds': { $all: selectedTags } });
        }
        const sortField = sortOption === 'earliest' ? 'startTime' : '-startTime';
        query = query.sort(sortField);
        const [itineraries, total] = await Promise.all([
            query.skip(skip).limit(pageSize).lean(),
            Itinerary.countDocuments(query)
        ]);
        const response = {
            data: itineraries,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            },
        };
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
export { searchItinerary };
