import * as React from 'react';


const mockDescriptionRatings = () => {
    const mockRatings = {
        "results": [
            {
                "property_name": "Cozy Mountain Cabin",
                "description_rating": "satisfactory",
                "description_rating_number": 65,
                "descsription_feedback": "The listing provides a decent overview of the property and its amenities, but lacks detail about the location and nearby attractions. It also could use more engaging language to draw potential guests in.",
                "descsription_suggestions": "Consider including specific details about the nearby attractions, activities, and the unique aspects of the cabin. Using more descriptive and inviting language could enhance the overall appeal.",
                "id": "listing123"
            },
            {
                "property_name": "Cozy 2 Bedroom Apartment",
                "description_rating": "satisfactory",
                "description_rating_number": 65,
                "descsription_feedback": "The listing provides basic information about the apartment's features and location, but lacks uniqueness and engaging language. It mostly includes essential details without showcasing what makes this property special.",
                "descsription_suggestions": "Enhance the description by adding more vivid details about the apartment’s decor and ambiance. Highlight any unique features such as views, local attractions, or special amenities that set this property apart from others in the area.",
                "id": "listing-1234"
            },
            {
                "property_name": "{description}",
                "description_rating": "satisfactory",
                "description_rating_number": 50,
                "descsription_feedback": "The description provides essential information but lacks detail and appeal. It does not effectively highlight the unique features or amenities of the property, making it less enticing to potential guests.",
                "descsription_suggestions": "Enhance the description with more vivid imagery and specific details about the property's features, surrounding attractions, and any additional amenities. Include any unique strengths or experiences that guests might enjoy during their stay.",
                "id": "{criteria}"
            },
            {
                "property_name": "Cozy Beachfront Cottage",
                "description_rating": "satisfactory",
                "description_rating_number": 70,
                "descsription_feedback": "The listing captures the essence of a beachfront cottage but lacks detailed information about amenities and nearby attractions.",
                "descsription_suggestions": "Include more specifics about amenities, nearby activities, local dining options, and any unique features of the cottage. Add some personal touches or highlights that would attract potential guests.",
                "id": "cottage-001"
            },
            {
                "property_name": "Charming Cottage in the Woods",
                "description_rating": "satisfactory",
                "description_rating_number": 70,
                "descsription_feedback": "The listing has a nice appeal, but lacks some key details that could attract potential guests. The description is somewhat generic and doesn't highlight unique features of the property or surrounding area.",
                "descsription_suggestions": "Add more specific details about the amenities offered, any special features of the cottage, and nearby attractions or activities. Including personal anecdotes or experiences from past guests can also enhance the appeal.",
                "id": "unique_listing_id_12345"
            },
            {
                "property_name": "Cozy Lakefront Retreat",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing effectively highlights the serene location by the lake and offers necessary details about the amenities available. However, it could benefit from a more vivid, engaging description of the unique features and experiences guests may have while staying.",
                "descsription_suggestions": "Consider adding more descriptive language that evokes emotion and imagery, such as the beauty of sunrise over the lake, nearby attractions, and any special touches that make the retreat memorable. Including guest testimonials or interesting stories from previous visits could also enhance the appeal.",
                "id": "1234abcd"
            },
            {
                "property_name": "",
                "description_rating": "needs_work",
                "description_rating_number": 40,
                "descsription_feedback": "The listing lacks detail and doesn't highlight unique features that would attract guests.",
                "descsription_suggestions": "Include specific amenities, local attractions, and a warm, inviting tone to better engage potential guests.",
                "id": ""
            },
            {
                "property_name": "Cozy Mountain Retreat",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing provides a nice overview of the property and its surroundings. It highlights key features and amenities but lacks detail in some areas that potential guests might find appealing.",
                "descsription_suggestions": "Consider adding more specifics about nearby attractions, detailed amenities, and unique aspects of your property. Including a welcome message or your personal touch as a host could also enhance the connection with potential guests.",
                "id": "12345"
            },
            {
                "property_name": "Cozy Mountain Escape",
                "description_rating": "good",
                "description_rating_number": 72,
                "descsription_feedback": "The description effectively conveys a sense of comfort and tranquility, highlighting the beautiful mountain views and cozy amenities. However, it could use more detail about nearby attractions and activities.",
                "descsription_suggestions": "Include more specific details about local attractions, dining options, and activities available in the area. Consider adding a section that highlights features of the property such as unique décor or special amenities like hot tubs or fireplaces.",
                "id": "listing-12345"
            },
            {
                "property_name": "Charming Downtown Apartment",
                "description_rating": "satisfactory",
                "description_rating_number": 65,
                "descsription_feedback": "The description provides a good overview of the apartment's features and location but lacks vivid detail. It mentions basic amenities but doesn't highlight unique selling points or nearby attractions that could entice potential guests.",
                "descsription_suggestions": "Enhance the description by adding more sensory details and focusing on what makes your apartment special. Consider including local attractions, unique characteristics of the apartment, or any special experiences guests can expect during their stay.",
                "id": "listing-12345"
            },
            {
                "property_name": "Charming Beachfront Cottage",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing provides a decent overview of the cottage's amenities and location but lacks some detail in certain areas.",
                "descsription_suggestions": "Enhance the description by adding more detailed information about nearby attractions, additional amenities, and any unique features of the cottage that set it apart from others.",
                "id": "1"
            },
            {
                "property_name": "Not provided",
                "description_rating": "needs_work",
                "description_rating_number": 40,
                "descsription_feedback": "The listing lacks detail and does not effectively entice potential guests. Key amenities, unique features, and local attractions are missing. It feels generic and may not capture the interest of potential visitors.",
                "descsription_suggestions": "Enhance the listing with more descriptive language. Include information about key amenities, unique features of the property, and local attractions or experiences. Use engaging language to create a more inviting atmosphere in the description.",
                "id": "not_provided"
            },
            {
                "property_name": "Charming Beachside Cottage",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing provides a good overview of the property with some appealing features highlighted, like proximity to the beach and cozy interior. However, it's somewhat generic and lacks specific details that could entice potential guests further.",
                "descsription_suggestions": "Include more specific amenities like Wi-Fi, kitchen appliances, and nearby attractions. Highlight unique selling points such as a view, local dining options, or any special features of the cottage that set it apart from others.",
                "id": "listing123"
            },
            {
                "property_name": "",
                "description_rating": "needs_work",
                "description_rating_number": 30,
                "descsription_feedback": "The listing lacks detail and fails to mention key features of the property, making it less appealing to potential guests.",
                "descsription_suggestions": "Include more information about the location, amenities, and unique aspects of the property to enhance its attractiveness.",
                "id": ""
            },
            {
                "property_name": "Charming City Apartment",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing provides a clear overview of the property, highlighting its charming features and central location. It is informative and engaging, making it appealing to potential guests.",
                "descsription_suggestions": "Consider adding more detail about the amenities available, as well as any unique aspects that could set this listing apart from others. Additionally, include local attractions or recommendations to enhance the travel experience.",
                "id": "listing_1"
            },
            {
                "property_name": "SeaView Cottage",
                "description_rating": "satisfactory",
                "description_rating_number": 65,
                "descsription_feedback": "The listing provides essential information but lacks detail and engaging language that could make it more appealing to potential guests. The description is straightforward but does not highlight the unique features of the property or local attractions effectively.",
                "descsription_suggestions": "Consider adding more personal touches to the description, such as the charm of the decor, the views from the property, any special amenities, and nearby attractions or activities. An engaging narrative can help potential guests imagine their stay and make an emotional connection.",
                "id": "listing_001"
            },
            {
                "property_name": "Charming Downtown Apartment",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The listing description is engaging and highlights the key features of the apartment, like location and amenities. However, it lacks some specific details about the surrounding area and local attractions that could make it more appealing.",
                "descsription_suggestions": "Consider adding more information about nearby restaurants, parks, public transport, and any unique aspects of the neighborhood that would attract potential guests.",
                "id": "abc123"
            },
            {
                "property_name": "Charming Downtown Apartment",
                "description_rating": "good",
                "description_rating_number": 75,
                "descsription_feedback": "The description effectively highlights the apartment's central location and modern amenities. However, it could be improved by providing more vivid imagery and details about the surroundings.",
                "descsription_suggestions": "Consider adding sensory details that evoke the atmosphere of the area, such as nearby attractions, parks, or restaurants. Including guest reviews or personal anecdotes related to the experience can also enhance appeal.",
                "id": "listing_001"
            }
        ]
    }

    return mockRatings;
}

export default mockDescriptionRatings;