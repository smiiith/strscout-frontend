const MockMarketSpyReportData = {
  message: "Comp analysis data retrieved successfully",
  data: {
    comp_basis: {
      id: "8a59c5bd-8db7-4a38-9e99-3e71ab8e0f0d",
      created_at: "2025-09-05T20:40:41.006092+00:00",
      profile_id: "065bc5ee-bdea-41cc-901a-77e2fea58388",
      address:
        "Ohio Expo Center & State Fairgrounds, 717 East 17th Avenue, Columbus, OH 43211, United States of America",
      latitude: "40.0029556",
      longitude: "-82.99131821341493",
      scan_id: "mf7aus6gkea5zx",
      status: "completed",
    },
    comps: [
      {
        comp_id: "3ae958b9-3a44-41d6-8ded-111814593ce6",
        property_id: "0d0061cd-f444-40fe-83f1-eace1d62783a",
        listing_id: "973414509698518148",
        overall_occupancy: 63,
        overall_genius_score: {
          title: {
            feedback: {
              items: [],
              summary: "rate_title failed to process",
            },
            revisions: null,
            suggestions: [
              "Unable to process rate_title due to technical error: 1 validation error for TitleExtendedRating\ntitle_rewrites\n  Field required [type=missing, input_value={'property_name': 'Sams S...66, 47, 68, 29, 58, 15]}, input_type=dict]\n    For further information visit https://errors.pydantic.dev/2.10/v/missing",
            ],
            property_name: "Fallback Property",
            rating_number: 75,
            expert_ratings: [
              75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
              75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
              75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
              75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
              75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
            ],
            title_rewrites: [
              "Fallback Title 1",
              "Fallback Title 2",
              "Fallback Title 3",
            ],
            rating_category: "Satisfactory",
          },
          amenities: {
            feedback: {
              items: [
                {
                  title: "Comprehensive Kitchen Setup",
                  feedback:
                    "The variety of kitchen appliances and utensils is impressive, making meal preparation easy for guests.",
                },
                {
                  title: "Thoughtful Family Features",
                  feedback:
                    "Child-friendly items such as dinnerware and toys add to the family-friendly atmosphere.",
                },
                {
                  title: "Safety Measures in Place",
                  feedback:
                    "Safety amenities like smoke detectors and first aid kits show your commitment to guest safety.",
                },
                {
                  title: "Outdoor Areas for Relaxation",
                  feedback:
                    "The outdoor spaces, including a BBQ grill and seating, offer great opportunities for leisure.",
                },
                {
                  title: "Solid Entertainment Options",
                  feedback:
                    "The inclusion of a large HDTV and reading materials enhances the guest experience.",
                },
              ],
              summary:
                "Your property features a strong selection of amenities, providing a welcoming and comfortable environment for guests. Attention to detail in several areas has been noted, but there is room for improvement in certain aspects.",
            },
            revisions: null,
            suggestions: [
              "Add a selection of board games for family entertainment.",
              "Include more toiletries in the bathroom for longer stays.",
              "Upgrade the outdoor furniture to accommodate more guests.",
              "Install additional lighting in the outdoor areas for nighttime use.",
              "Consider offering a welcome basket with snacks and drinks.",
            ],
            property_name: "Boutique Stay",
            rating_number: 79,
            expert_ratings: [
              82, 73, 91, 55, 67, 78, 80, 88, 72, 62, 77, 84, 61, 85, 47, 53,
              68, 92, 70, 72, 87, 76, 66, 81, 88, 74, 62, 90, 55, 77, 95, 82,
              70, 68, 75, 63, 48, 57, 83, 84, 91, 95, 84, 77, 89, 73, 65, 78,
              64, 76, 80, 67, 92, 63, 71, 86, 89, 72, 87, 59, 62, 68, 81, 54,
              40, 52, 73, 64, 88, 91, 55, 72, 71, 83, 90, 76, 62, 74, 79, 94,
              51, 89, 41, 76, 87, 90, 84, 69, 55, 67, 75, 78, 87, 70, 53, 92,
              65, 88, 59, 79, 85, 93, 50, 66, 95, 48, 56, 68, 62, 75, 81, 74,
              54, 87,
            ],
            rating_category: "Satisfactory",
          },
          hero_image: {
            feedback: {
              items: [
                {
                  title: "Cozy Atmosphere",
                  feedback:
                    "The warm tones and cozy layout reflect a welcoming ambiance that's sure to attract guests.",
                },
                {
                  title: "Modern Design",
                  feedback:
                    "The modern furnishings and stylish elements, like the black shiplap wall and sleek furniture, lend a contemporary feel that aligns with the home's description.",
                },
                {
                  title: "Well-lit Space",
                  feedback:
                    "The lighting highlights key features, creating an inviting and warm environment.",
                },
              ],
              summary:
                "The hero image captures the cozy and modern ambiance of the property effectively, providing a welcoming and stylish view of the living area.",
            },
            revisions: null,
            suggestions: [
              "Consider adding more images showcasing outdoor spaces like the porch and patio.",
              "Include a few different angles of the living room to provide a more comprehensive view.",
              "Feature any unique decor elements or artworks in close-up shots.",
              "Showcase the kitchen and dining area as they are key highlights of the property.",
              "Include images that capture natural light streaming into the home, emphasizing brightness.",
            ],
            property_name: "Sams Spot II - Renovated 1915 Home + Porch & Patio",
            rating_number: 87,
            expert_ratings: [
              85, 86, 87, 89, 88, 86, 85, 90, 87, 88, 86, 87, 85, 89, 88, 87,
              89, 86, 87, 88, 85, 86, 87, 88, 86, 89, 88, 87, 86, 85, 88, 87,
              86, 89, 90, 88, 87, 86, 88, 87, 85, 89, 87, 86, 88, 87, 85, 90,
              89, 86, 88, 87, 89, 87, 86, 85, 88, 87, 86, 85, 88, 87, 89, 86,
              87, 88, 85, 87, 89, 88, 87, 86, 87, 88, 85, 89, 88, 87, 86, 89,
              87, 88, 86, 85, 88, 87, 85, 89, 88, 87, 86, 87, 89, 88, 86, 85,
            ],
            rating_category: "Good",
          },
          description: {
            feedback: {
              items: [
                {
                  title: "Descriptive Language",
                  feedback:
                    "The description has a good balance of information and detail, but try incorporating more vivid adjectives to create an inviting atmosphere.",
                },
                {
                  title: "Highlight Unique Features",
                  feedback:
                    "While you've mentioned many amenities, emphasizing unique features can make your listing stand out more to potential guests.",
                },
                {
                  title: "Call to Action",
                  feedback:
                    "Encourage potential guests directly to book or reach out to inquire. A strong call to action can engage visitors more effectively.",
                },
                {
                  title: "Clarify Neighborhood Noise",
                  feedback:
                    "While it's good to be transparent about potential noise, framing it as less of a downside and more as part of the vibrant neighborhood can enhance appeal.",
                },
                {
                  title: "Brevity and Clarity",
                  feedback:
                    "Some sections can be more concise. Streamlining the information will enhance readability and keep potential guests interested.",
                },
              ],
              summary:
                "Your property description is well-crafted, providing a good amount of detail about the space and its amenities. To attract more guests, consider enhancing the emotional appeal and clarity in certain areas.",
            },
            revisions: null,
            suggestions: [
              "Use more engaging visual language to evoke a sense of warmth and comfort.",
              "Emphasize the unique historical aspects of the home and its restoration.",
              "Create a more enticing call to action that invites guests to book their stay immediately.",
              "Streamline the description to eliminate repetitive information and enhance flow.",
              "Increase the focus on local attractions and experiences to entice guests seeking exploration options.",
            ],
            property_name: "Sams Spot II",
            rating_number: 79,
            expert_ratings: [
              66, 89, 78, 82, 67, 72, 75, 55, 88, 90, 84, 61, 85, 73, 68, 80,
              69, 88, 92, 64, 83, 87, 75, 70, 78, 81, 72, 77, 69, 62, 57, 58,
              68, 82, 79, 74, 66, 92, 70, 62, 54, 72, 78, 88, 80, 64, 56, 75,
              92, 83, 72, 66, 65, 67, 81, 90, 66, 76, 74, 82, 56, 63, 66, 64,
              80, 68, 90, 74, 77, 62, 84, 68, 53, 88, 62, 63, 65, 66, 67, 88,
              85, 61, 70, 85, 76, 73, 64, 86, 78, 77, 68, 81, 72, 75, 82, 77,
              64, 81, 69, 54, 85, 66, 61, 80, 66, 66, 66,
            ],
            rating_category: "Satisfactory",
            description_rewrite: {
              guest_access:
                "You're invited to enjoy full access to the entire duplex during your stay! With easy contactless check-in, you can dive right into your adventure. The backyard is shared with another unit, providing enough outdoor seating for everyone to enjoy.",
              your_property:
                "Welcome to Sams Spot II! Enjoy a delightful stay in our renovated 1915 home featuring a spacious layout, modern kitchen, and an inviting front porch. With cozy furnishings and a tranquil back patio, it's a perfect retreat for relaxation and fun. Located near the lively Short North area and Italian Village, you're close to eateries, bars, and local art galleries!",
              listing_description:
                "Step into Sams Spot II, a beautifully renovated 1915 duplex nestled in Columbus. With spacious interiors, cozy furnishings, and a charming front porch, it's the perfect getaway. Just minutes away from the vibrant Italian Village and Short North, this home invites you to relax on the back patio or explore nearby attractions. Experience a blend of modern amenities and historical character during your stay!",
              other_details_to_note:
                "Please respect the shared wall with the neighboring unit to ensure a peaceful atmosphere. We're here for any queries and to help enhance your stay!",
              interaction_with_guests:
                "We’re always nearby and happy to provide recommendations or assistance for a flawless stay. Your comfort is our priority, so feel free to reach out anytime with questions or needs.",
            },
          },
          other_images: {
            feedback: {
              items: [
                {
                  title: "Stunning Interiors",
                  feedback:
                    "You've done a fantastic job showcasing the interiors, especially with the lighting that enhances each room's ambiance.",
                },
                {
                  title: "Well-Structured Layout",
                  feedback:
                    "The layout in the photos provides a clear understanding of the space's flow and design.",
                },
                {
                  title: "Inviting Atmosphere",
                  feedback:
                    "The images convey a warm and welcoming atmosphere, sure to attract guests seeking comfort and style.",
                },
              ],
              summary:
                "The photos of your boutique stay beautifully capture the property's unique charm and elegance. The lighting and composition are superb, highlighting the inviting atmosphere of each space.",
            },
            revisions: null,
            suggestions: [
              "Consider adding a few dusk or twilight shots to highlight outdoor lighting features.",
              "Include a couple of close-up shots of unique decor elements to add personality.",
              "Try a few angles from eye-level to show the space as guests would experience it.",
            ],
            property_name: "Boutique Stay",
            rating_number: 88,
            expert_ratings: [
              85, 90, 88, 86, 87, 92, 89, 91, 84, 87, 88, 90, 89, 85, 87, 88,
              89, 90, 92, 93, 85, 88, 87, 89, 90, 91, 88, 86, 87, 89, 90, 89,
              87, 88, 86, 87, 89, 91, 89, 88, 87, 89, 90, 88, 89, 91, 85, 87,
              88, 89, 88, 90, 85, 88, 89, 87, 88, 90, 91, 87, 90, 89, 88, 91,
              86, 89, 90, 88, 89, 87, 86, 88, 90, 89, 90, 91, 86, 88, 87, 89,
              88, 89, 90, 89, 88, 92, 88, 87, 89, 90, 88, 87, 89, 90, 89, 88,
              87, 89, 90, 91,
            ],
            rating_category: "Good",
          },
          interior_design: {
            feedback: {
              items: [
                {
                  title: "Color Scheme",
                  feedback:
                    "The neutral color palette is pleasing but could benefit from more vibrant accent colors to liven up the space.",
                },
                {
                  title: "Furniture Arrangement",
                  feedback:
                    "The arrangement is functional, but better flow between the living areas and dining space could enhance social interaction.",
                },
                {
                  title: "Decor Elements",
                  feedback:
                    "While the decor is cozy, adding more artwork or personal touches could elevate the design and make it feel more inviting.",
                },
                {
                  title: "Outdoor Space",
                  feedback:
                    "The patio setup is lovely, but including some greenery or decorative lighting could create a more welcoming ambiance.",
                },
                {
                  title: "Lighting",
                  feedback:
                    "The various light sources could be improved by adding dimmers or softer lighting options for a cozier atmosphere in the evenings.",
                },
              ],
              summary:
                "Your listing offers a charming blend of modern amenities and vintage character that guests are likely to appreciate. However, a few aspects could enhance the overall aesthetic and guest experience.",
            },
            revisions: null,
            suggestions: [
              "Incorporate colorful throw pillows or blankets to add vibrancy.",
              "Rearrange the living room furniture to encourage conversation.",
              "Add some local artwork or photographs to personalize the space.",
              "Include outdoor plants or decorative lights on the patio to enhance the outdoor appeal.",
              "Install dimmable light fixtures to create adjustable ambiance.",
            ],
            property_name: "Sams Spot II - Renovated 1915 Home + Porch & Patio",
            rating_number: 74,
            expert_ratings: [
              23, 67, 51, 85, 59, 75, 64, 62, 39, 70, 56, 73, 48, 69, 41, 55,
              54, 26, 47, 33, 36, 27, 34, 60, 68, 42, 20, 70, 53, 65, 45, 66,
              55, 40, 30, 74, 78, 57, 24, 76, 75, 39, 53, 66, 57, 28, 82, 81,
              46, 35, 45, 68, 54, 66, 59, 52, 61, 25, 69, 44, 32, 71, 71, 38,
              28, 49, 39, 48, 26, 80, 56, 25, 75, 55, 33, 19, 35, 16, 77, 53,
              82, 45, 50, 64, 17, 43, 20, 67, 48, 30, 52, 76, 15, 62, 31, 71,
              77, 26, 63, 18, 63, 73, 88, 53, 64, 26, 21, 19,
            ],
            rating_category: "Satisfactory",
          },
          overall_ratings: {
            feedback: {
              items: [],
              summary:
                "Based on analysis of all categories, this property scores 81/99. The rating considers hero image (20%), title (17.5%), other images (17.5%), description (15%), amenities (15%), and interior design (15%).",
            },
            revisions: null,
            suggestions: [
              "Focus on improving the lowest-rated categories for maximum impact",
              "Maintain strengths in your highest-performing areas",
              "Consider the weighted importance when prioritizing improvements",
            ],
            property_name: "Overall Property Rating",
            rating_number: 81,
            expert_ratings: [
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81,
            ],
            rating_category: "Good",
          },
        },
        bedrooms: "3 bedrooms",
        average_review: 5,
        number_of_reviews: 5,
        policies: {
          house_rules:
            "Things to know\nHouse rules\nCheck-in after 4:00 PM\nCheckout before 10:00 AM\n8 guests maximum\nShow more\nSafety & property\nExterior security cameras on property\nCarbon monoxide alarm\nSmoke alarm\nShow more\nCancellation policy\nAdd your trip dates to get the cancellation details for this stay.\nAdd dates",
          cancellation_policy:
            "strict with all of its shops restaurants galleries and bars. A quick drive or short walk in the other direction will take you to Ohio State University’s main campus where the Buckeyes play and you can find countless cozy cafes to grab a coffee or just relax. The Ohio State Expo Center is also only three blocks from our house which makes for an easy walk if you’re visiting the fair grounds. Home to the Columbus Blue Jackets the Crew and the Clippers the nearby Arena District is very accessi",
          self_checkin: true,
          self_checkin_details: "Self check-in",
          instant_book: false,
          pets_allowed: true,
        },
        hero_image_link:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTczNDE0NTA5Njk4NTE4MTQ4/original/0761a62c-3ffd-427c-bb06-4632c318d257.jpeg?im_w=720",
        title:
          "Sams Spot II - Renovated 1915 Home + Porch & Patio\nShare\nSave",
        description:
          "Enjoy your trip to Columbus in our fully remodeled home with modern additions & cozy furnishings to make your stay peaceful and inspiring. Situated near the ever-popular Italian Village and just a quick ride to the Short North, Ohio State’s main campus, & downtown. Sam’s Spot is sure to provide the perfect home base for whatever brings you to town. Relax on the breezy front porch or on the secluded back patio. Simplified check-in/out procedures ensure you can focus on enjoying your stay!\n\nThe space\nWelcome to our fully restored 1915 duplex in the heart of Columbus. The home is spacious with large bedrooms, a large kitchen and dining room, as well as a brand new paver patio with sun umbrella and ample seating for you and your friends or family. Traveling alone or in a small group? The cozy furnishings, quaint front porch, and thoughtful touches will make you feel at home during your stay at Sam’s Spot. \n\nYou can’t beat our location for all things Columbus! Located near the vibrant Italian Village Corridor, you will be centrally located within a short drive or walk to nearly any Columbus attraction. Just a few minutes away you’ll find the Short North Arts District with all of its shops, restaurants, galleries, and bars. A quick drive or short walk in the other direction will take you to Ohio State University’s main campus where the Buckeyes play and you can find countless cozy cafes to grab a coffee or just relax. The Ohio State Expo Center is also only three blocks from our house which makes for an easy walk if you’re visiting the fair grounds. Home to the Columbus Blue Jackets, the Crew, and the Clippers, the nearby Arena District is very accessible.\n\nFor your comfort, the home offers a king-sized bed and two queen beds between the three bedrooms, plus a full size sleeper sofa that pulls out from the living room couch to provide plenty of space for you and your traveling companions. \n\nWe offer a host of amenities for your convenience and comfort. Prepare a meal with your friends or family in the fully stocked, brand new kitchen overlooking the back patio. A Keurig is provided with a variety of K-Cups for your enjoyment. Utilize the smart Fire TVs to stream your favorite music, movies, and shows. Having a quiet night on the couch? Dim the lights and light up the electric fireplace for a cozy evening inside. The front porch offers a large couch with memory foam cushions for you to sit and enjoy the quiet mornings or breezy afternoons. Additional outdoor space in the fully fenced in backyard with a new paver patio offers ample comfy seating in a more private environment.\n\nThe oversized shower provides tons of natural light with privacy glass blocks and a peaceful atmosphere under the rain shower-head. Get ready for a night out in front of the large backlit LED bathroom mirror. \nWe pay special attention to disinfecting high-touch areas of the home between reservations for your health and safety. \n\nPlease keep in mind that the house is a duplex and shares a wall with another home. Soundproofing has been completed between the homes, however excessive noise will be heard through the walls and disrupt the other guests. Please be respectful of the neighbors and quiet hours. Additionally, the house is located in a popular and growing neighborhood, so there is occasional noise from outside that you may hear in the home. \n\nWe are so happy that you are considering our home! We hope to be able to host you during your stay in Columbus. Please reach out with any questions so that we can help make your trip wonderful!\n\nGuest access\nWelcome to your home away from home! You will have exclusive access to the entire unit during your stay, giving you the privacy and comfort you desire. Check-in is a breeze with our easy contactless, keyless self check in. \n\nPlease note that the house is a duplex so the fenced in backyard is a shared space between the two units. There are two separate paver patios and sun umbrellas for each house’s guests, but there’s no privacy fence between the two patios. Street parking is free around the home and can typically be found right in front of the house. \n\nWe want you to have a stress free and enjoyable stay, so if you need anything or have any questions, please do not hesitate to reach out to us. We are always available to assist you and make your stay as comfortable as possible.\n\nOther things to note\nAt Sam’s Spot, we are committed to ensuring you have an enjoyable and hassle-free stay. We live nearby so if any needs or concerns arise during your stay, please don’t hesitate to reach out. We have lived in the neighborhood for quite a few years now so if you need help with dinner plans, night life, or city tips, we would be delighted to offer our advice or suggestions!\nAlso, there is a doorbell camera you’ll notice to the left of the front door. This is for our homes security as well as yours. Please do not cover or tamper with it. There are no other cameras or listening devices located on the property.\nReservations for 28 days or longer require a signed Rental Agreement.\n\nRegistration Details\n2025-1179\nShow more",
        thirty_day: 87,
        sixty_day: 80,
        ninety_day: 15,
        created_at: "2025-09-05T20:43:21.56344+00:00",
      },
      {
        comp_id: "686a66bd-446e-4e4c-bc88-9a1dca770905",
        property_id: "48649b7a-e110-4c31-b22e-6ab347fd45bd",
        listing_id: "1406001281322231228",
        overall_occupancy: 41,
        overall_genius_score: {
          title: {
            feedback: {
              items: [
                {
                  title: "Need for Specificity",
                  feedback:
                    "Consider adding notable attractions or amenities in the title to attract more interest.",
                },
                {
                  title: "Warmth and Comfort",
                  feedback:
                    "The term 'Cozy' is appealing, but think about describing what makes it cozy.",
                },
                {
                  title: "Highlight Unique Features",
                  feedback:
                    "Mention any unique amenities or experiences to differentiate your listing.",
                },
                {
                  title: "Clarity on Location",
                  feedback:
                    "Including 'near' is good, but specifying distance or landmarks enhances clarity.",
                },
                {
                  title: "Emotional Connect",
                  feedback:
                    "Adding an emotional or experiential angle could make the title more compelling.",
                },
              ],
              summary:
                "Your title is inviting but could be enhanced with more specific location details or unique features.",
            },
            revisions: [
              "Warm & Cozy Cottage Near Fairgrounds",
              "Charming Retreat Near Fairgrounds with Ping Pong Table",
              "Relaxing Getaway Near Fairgrounds & Downtown Columbus",
            ],
            suggestions: [
              "Incorporate more specific attractions or features in the title.",
              "Use descriptive language to highlight warmth and comfort.",
              "Mention unique selling points like the ping-pong table or historical charm.",
              "Consider adding proximity details to key locations.",
              "Use a richer descriptor rather than just 'Cozy'.",
            ],
            property_name: "Cozy Retreat Near Fairgrounds",
            rating_number: 72,
            expert_ratings: [
              67, 78, 70, 72, 65, 75, 80, 73, 68, 71, 69, 66, 77, 74, 80, 62,
              64, 79, 71, 75, 78, 73, 70, 76, 68, 65, 67, 72, 81, 74, 62, 66,
              69, 73, 78, 80, 64, 70, 72, 68, 75, 77, 65, 74, 73, 73, 71, 69,
              67, 76, 62, 78, 71, 65, 66, 75, 80, 68, 70, 67, 71, 75, 72, 78,
              74, 67, 75, 63, 76, 72, 79, 71, 68, 78, 76, 79, 73, 71, 75, 72,
              70, 80, 73, 68, 78, 74, 68, 72, 69, 71, 77, 75, 76, 65, 67, 72,
              74, 77, 62, 66, 80, 65, 72, 71, 67, 70, 75, 78, 73, 74, 69, 67,
              66, 62, 64, 75, 71, 66, 78, 73,
            ],
            title_rewrites: [
              "Charming Cozy Retreat Close to Fairgrounds",
              "Historic Cozy Getaway Near Fairgrounds & Stadium",
              "Cozy Family Retreat Near Fairgrounds & Attractions",
            ],
            rating_category: "Satisfactory",
          },
          amenities: {
            feedback: {
              items: [
                {
                  title: "Bathroom Essentials",
                  feedback:
                    "You provide a comprehensive selection of bathroom amenities such as shampoo, conditioner, and body soap, ensuring guests have a comfortable experience.",
                },
                {
                  title: "Laundry Facilities",
                  feedback:
                    "The availability of a washer and free dryer in the unit, along with provided bed linens, offers convenience, especially for longer stays.",
                },
                {
                  title: "Kitchen Amenities",
                  feedback:
                    "Your kitchen is well-equipped with essential appliances and utensils, which is a great perk for guests who prefer cooking their own meals.",
                },
                {
                  title: "Entertainment Options",
                  feedback:
                    "The inclusion of a TV, bluetooth sound system, and board games enriches the guest experience, making the property suitable for families and groups.",
                },
                {
                  title: "Safety Features",
                  feedback:
                    "The presence of smoke alarms, carbon monoxide alarms, and a fire extinguisher demonstrates a commitment to guest safety.",
                },
              ],
              summary:
                "Your property offers an impressive range of amenities that cater well to guests' needs, creating a memorable stay experience.",
            },
            revisions: null,
            suggestions: [
              "Consider adding more outdoor furniture to enhance the patio space for relaxation and socializing.",
              "Including additional cooking spices in the kitchen could elevate the cooking experience for guests.",
              "Enhance the entertainment options with streaming services on the TV to cater to diverse guest preferences.",
            ],
            property_name: "Boutique Stay",
            rating_number: 85,
            expert_ratings: [
              37, 82, 31, 45, 76, 61, 54, 9, 69, 71, 38, 29, 32, 81, 48, 66, 13,
              16, 91, 65, 18, 35, 91, 77, 53, 67, 71, 72, 95, 76, 77, 70, 47,
              46, 26, 88, 93, 37, 68, 41, 39, 14, 49, 77, 19, 1, 11, 31, 92, 35,
              60, 87, 32, 38, 87, 55, 20, 41, 95, 51, 66, 86, 25, 91, 31, 84,
              29, 30, 92, 10, 67, 8, 72, 36, 25, 93, 25, 64, 99, 52, 30, 48, 55,
              36, 84, 78, 12, 20, 41, 18, 30, 4, 40, 76, 86, 51, 66, 79, 87, 64,
              9, 96, 83, 98, 90, 29,
            ],
            rating_category: "Good",
          },
          hero_image: {
            feedback: {
              items: [
                {
                  title: "Atmosphere",
                  feedback:
                    "The image effectively shows the front of the property, highlighting its charming porch and mature trees, which adds to the cozy appeal.",
                },
                {
                  title: "Clarity",
                  feedback:
                    "The image is clear and well-lit but could use a more dynamic angle to showcase the architecture better.",
                },
                {
                  title: "First Impression",
                  feedback:
                    "It sets a welcoming tone but could benefit from showing unique features or amenities mentioned in the listing.",
                },
              ],
              summary:
                "Your hero image captures the charm and approachability of a cozy retreat, with room for enhancement to make it more inviting.",
            },
            revisions: [
              "Retake the image including the front sidewalk and some surrounding greenery.",
              "Capture the porch area with some activity like seating setup for morning coffee.",
              "Take a photo showing the front in early evening light to capture a cozy ambiance.",
            ],
            suggestions: [
              "Capture the front with a wider angle to showcase more of the surroundings.",
              "Include elements that highlight amenities like a BBQ grill or seating area.",
              "Consider capturing the image at sunset for a warmer lighting effect.",
              "Add some seasonal decoration to the porch for an inviting look.",
            ],
            property_name: "Cozy Retreat Near Fairgrounds",
            rating_number: 70,
            expert_ratings: [
              69, 72, 68, 70, 75, 65, 66, 73, 74, 71, 67, 68, 72, 70, 69, 78,
              65, 64, 71, 69, 73, 74, 65, 67, 66, 68, 72, 71, 70, 74, 69, 66,
              68, 64, 77, 68, 69, 71, 70, 72, 73, 67, 69, 66, 65, 75, 72, 71,
              70, 73, 74, 65, 72, 68, 67, 66, 76, 65, 69, 73, 74, 70, 72, 71,
              65, 67, 68, 69, 77, 71, 70, 66, 74, 72, 69, 65, 68, 67, 70, 71,
              73, 74, 66, 65, 69, 72, 68, 70, 74, 73, 66, 65, 77, 69, 68, 72,
              70, 65, 66, 71,
            ],
            rating_category: "Needs Work",
          },
          description: {
            feedback: {
              items: [
                {
                  title: "Description Length and Clarity",
                  feedback:
                    "Consider simplifying some descriptions for quicker reading. Bullet points are great, but they can be overwhelming if not broken up.",
                },
                {
                  title: "Highlight Unique Features",
                  feedback:
                    "You mention lovely features of the property, but try emphasizing more of the uniqueness, like the history of the home, in the initial sections.",
                },
                {
                  title: "Outdoor Space and Ambiance",
                  feedback:
                    "The outdoor features could use a more enticing description that paints a picture of relaxation or gatherings in the backyard.",
                },
                {
                  title: "Be Specific on Access",
                  feedback:
                    "Detailing check-in procedures and any house rules early on will set clear expectations for guests.",
                },
                {
                  title: "Unique Selling Propositions",
                  feedback:
                    "If there are any local experiences or attractions that stand out, include those to lure guests exploring the community.",
                },
              ],
              summary:
                "Your listing is informative and highlights many appealing aspects. However, a bit more detail and polish would make it even more attractive to potential guests.",
            },
            revisions: null,
            suggestions: [
              "Add more personality to the description to make it warmer.",
              "Include local recommendations or highlights nearby to attract guests.",
              "Revise the flow of the description for better pace and readability.",
            ],
            property_name: "Cozy Retreat Near Fairgrounds",
            rating_number: 79,
            expert_ratings: [
              72, 85, 80, 76, 75, 90, 78, 70, 82, 84, 69, 88, 91, 77, 73, 79,
              74, 81, 72, 89, 76, 80, 74, 83, 82, 77, 88, 68, 90, 75, 81, 78,
              82, 79, 85, 91, 73, 75, 87, 76, 71, 77, 86, 69, 88, 82, 80, 78,
              72, 76, 82, 91, 87, 74, 86, 83, 75, 78, 91, 90, 69, 81, 83, 92,
              84, 80, 79, 88, 75, 93, 85, 74, 81, 72, 89, 82, 89, 90, 70, 71,
              86, 84, 81, 77, 69, 72, 76, 83, 79, 90, 86, 75, 87, 70, 85, 88,
              84, 82, 91, 79, 72, 80, 74, 76, 78, 81, 77, 71, 90, 85, 72, 81,
              84, 80,
            ],
            rating_category: "Satisfactory",
            description_rewrite: {
              guest_access:
                "Guests have full access to both floors, including a cozy living area, equipped kitchen, basement laundry, and outdoor amenities during their stay.",
              your_property:
                "A unique home filled with character, featuring original hardwood and handcrafted elements. Perfect for family gatherings and creating cherished memories.",
              listing_description:
                "Enjoy a cozy stay at Dacha, our charming 100-year-old home near Fairgrounds. Just a short walk from Historic Crew Stadium and within a 15-minute drive of John Glenn Columbus International Airport and OSU campus. Relax in our spacious living area featuring Netflix, or game in the basement with a ping pong table! Enjoy a lovely outdoor space with seating and a gas grill ready for family meals under the stars.",
              other_details_to_note:
                "This historic home has its quirks, from squeaky floors to charming built-ins. Embrace the uniqueness of Dacha for a relaxing stay!",
              interaction_with_guests:
                "I am always available for any questions. Feel free to reach out via message during your stay for local tips or assistance.",
            },
          },
          other_images: {
            feedback: {
              items: [
                {
                  title: "Quality and Lighting",
                  feedback:
                    "The overall image quality is decent, with good exposure making the rooms appear bright and inviting.",
                },
                {
                  title: "Ambiance and Style",
                  feedback:
                    "The decor feels homey and comfortable, yet it may lack the distinctive flair expected in a boutique stay.",
                },
                {
                  title: "Variety and Coverage",
                  feedback:
                    "You have a diverse array of images covering both internal and external spaces, which helps convey the full experience.",
                },
              ],
              summary:
                "The photos capture the essence of what makes your property inviting, though there are areas for enhancement that could elevate its boutique appeal further.",
            },
            revisions: null,
            suggestions: [
              "Enhance the decor to create a more boutique and unique feel.",
              "Consider professional photography to capture each room in the best light.",
              "Add small details or artistry that stand out and align with a boutique stay.",
              "Add some greenery or plants to add a touch of freshness.",
              "Include more diverse angles to show different perspectives of the space.",
              "Consider Hiring a Professional Photographer\n                               \n            While your photos are a good start, hiring a professional photographer could significantly elevate the visual appeal of your listing. A pro has the experience to capture your space in the best possible light, ensuring that it looks both inviting and accurate. This investment can help differentiate your property in a competitive market, where high-quality visuals can be the deciding factor for potential guests. Professional photographers are skilled in aspects like lighting, composition, and angles, which can make your property look more spacious, appealing, and true to its real-life charm.\n                               \n            For Those Who Prefer DIY Photography or Are Working Within a Budget\n                               \n            If you prefer to handle your own photography or a professional is outside your budget, here are a few simple tips to help improve your photos:\n                               \n            Maximize Natural Light: Aim to shoot during the day when natural light is abundant. Open all windows, use light-colored curtains, and avoid harsh overhead lights. Natural light enhances the warmth and appeal of the space, making it feel more inviting.\n                               \n            Use Wide Angles: When photographing rooms, use wide-angle shots to capture the entire space. This helps give viewers a sense of the room's size and layout. Avoid tight or cluttered shots, as they can make the space feel smaller than it actually is.\n                               \n            Focus on Clean and Tidy Staging: Before you take the photo, clear away any clutter. Neatly arrange furniture and decor to make the space look polished and functional. The simpler and more streamlined the space appears, the more likely it is to resonate with potential guests.",
            ],
            property_name: "Boutique Stay",
            rating_number: 67,
            expert_ratings: [
              65, 68, 70, 66, 67, 68, 69, 65, 64, 70, 66, 69, 67, 68, 65, 66,
              67, 71, 66, 65, 68, 67, 66, 66, 69, 70, 65, 64, 67, 68, 69, 65,
              68, 67, 66, 66, 69, 65, 68, 70, 67, 65, 66, 68, 69, 67, 66, 65,
              64, 68, 69, 70, 66, 65, 67, 66, 70, 66, 68, 65, 67, 69, 68, 66,
              67, 70, 69, 68, 67, 66, 65, 64, 70, 67, 66, 69, 68, 67, 66, 70,
              65, 67, 68, 66, 67, 65, 64, 70, 68, 66, 69, 67, 67, 65, 68, 64,
              65, 71, 69, 67,
            ],
            rating_category: "Needs Work",
          },
          interior_design: {
            feedback: {
              items: [
                {
                  title: "Living Area Comfort",
                  feedback:
                    "The seating arrangement is cozy, but consider adding more cushions or decorative throws to enhance comfort.",
                },
                {
                  title: "Kitchen Functionality",
                  feedback:
                    "The kitchen is well-equipped, but guests may appreciate additional counter space or a more contemporary look.",
                },
                {
                  title: "Bedroom Layout",
                  feedback:
                    "The bedrooms are warm and inviting, but uniform bedding styles may enhance cohesiveness and appeal.",
                },
                {
                  title: "Bathroom Amenities",
                  feedback:
                    "The bathroom has ample supplies, but consider updating fixtures for a fresher look.",
                },
                {
                  title: "Outdoor Spaces",
                  feedback:
                    "The outdoor seating area is pleasant; adding more greenery and decor could enhance the experience.",
                },
              ],
              summary:
                "Your interior design has a unique charm that reflects the character of the home. It creates a spacious and inviting atmosphere, but could benefit from some modern updates.",
            },
            revisions: null,
            suggestions: [
              "Add some decorative elements that reflect local culture and history.",
              "Consider repainting to brighter, modern colors that can give a fresh look.",
              "Incorporate more functional items that also serve as decor, such as stylish storage solutions.",
            ],
            property_name: "Cozy Retreat Near Fairgrounds",
            rating_number: 51,
            expert_ratings: [
              45, 39, 52, 28, 41, 35, 44, 56, 38, 61, 33, 34, 58, 19, 60, 29,
              22, 37, 40, 54, 27, 49, 67, 68, 20, 24, 46, 57, 21, 42, 71, 32,
              75, 18, 83, 31, 72, 51, 76, 55, 36, 63, 81, 74, 59, 20, 23, 65,
              30, 69, 52, 12, 16, 50, 26, 11, 88, 73, 43, 66, 64, 78, 12, 53,
              80, 78, 27, 32, 14, 62, 9, 80, 38, 86, 39, 66, 89, 6, 38, 4, 60,
              74, 28, 35, 37, 75, 26, 53, 65, 39, 15, 17, 49, 56, 77, 54, 9, 14,
              23, 17, 11, 83, 7, 49, 34, 44, 15,
            ],
            rating_category: "Fail",
          },
          overall_ratings: {
            feedback: {
              items: [],
              summary:
                "Based on analysis of all categories, this property scores 71/99. The rating considers hero image (20%), title (17.5%), other images (17.5%), description (15%), amenities (15%), and interior design (15%).",
            },
            revisions: null,
            suggestions: [
              "Focus on improving the lowest-rated categories for maximum impact",
              "Maintain strengths in your highest-performing areas",
              "Consider the weighted importance when prioritizing improvements",
            ],
            property_name: "Overall Property Rating",
            rating_number: 71,
            expert_ratings: [
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71,
              71, 71, 71, 71,
            ],
            rating_category: "Satisfactory",
          },
        },
        bedrooms: "3 bedrooms",
        average_review: 4.92,
        number_of_reviews: 12,
        policies: {
          house_rules:
            "Things to know\nHouse rules\nCheck-in after 4:00 PM\nCheckout before 11:00 AM\n6 guests maximum\nShow more\nSafety & property\nCarbon monoxide alarm\nSmoke alarm\nNot suitable for infants (under 2 years)\nShow more\nCancellation policy\nAdd your trip dates to get the cancellation details for this stay.\nAdd dates",
          cancellation_policy:
            "strict of ColumbiaRating 5 stars · 3 weeks ago · Stayed with kidsThe home was spotless (I'd like these hosts to help me arrange and tidy up and clean my personal home!!!) and very conveniently arranged (labels on light switches and cupboards). Very comfortable in the summer heat too. The street was residential; quiet and peaceful.Show moreAubreyDenver ColoradoRating 5 stars · July 2025 · Stayed a few nightsBeautiful classic home with original features. Everything was very clean and t",
          self_checkin: true,
          self_checkin_details: "Self check-in",
          instant_book: false,
          pets_allowed: true,
        },
        hero_image_link:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQwNjAwMTI4MTMyMjIzMTIyOA==/original/68449302-9483-4052-ae73-20b387c2c055.jpeg?im_w=720",
        title: "Cozy Retreat Near Fairgrounds\nShare\nSave",
        description:
          "Enjoy this home just a short walk from the Fairgrounds and Historic Crew Stadium. Centrally located within a 15-minute drive from/to John Glenn Columbus International Airport and a 10-minute drive to the Ohio State University campus,  Short North, downtown Columbus, local dining, and attractions. Our house is equipped with High Speed Internet, Ping Pong table, and more.\n\nThe space\n🏠 First Floor\n\nLiving & Dining Room \n• Comfortable seating \n• TV with complimentary access to Netflix\n• Large dining table \n\nKitchen\n• Fully equipped with dishes, silverware, cookware, and basic cooking essentials (oil, spices)\n• Microwave, stove, and dishwasher\n• Coffee station with a dual-function drip and pod coffee maker\n• Toaster\n• Cozy breakfast nook\n\nBasement (Laundry Area)\n• Washer and dryer\n• Laundry supplies provided (detergent, softener, dryer sheets)\n• Ping-Pong Table (balls and paddles provided)\n\n🛏️ Second Floor\n\nBedroom 1\n• Queen-sized bed\n\nBedroom 2\n• Queen-sized bed\n\nBedroom 3\n• Twin bed with pullout option for additional sleeping space\n\nFull Bathroom\n• Bathtub/shower combo\n• Fresh bath supplies provided\n\n🌳 Outdoor Spaces\n\nBackyard (secluded but not fully fenced)\n• Seating and dining area\n• Gas grill (grilling utensils can be found in the kitchen).\n\nFront Porch\n• Seating area\n\nGuest access\nGuests have full access to both the first and second floors of the home, as well as the backyard. You're welcome to use the laundry room located in the basement and play table tennis.\n\nOther things to note\nThis home is over 100 years old and full of character. It’s not a cookie-cutter design, but a unique space with original hardwood details that reflect its history. Hand-crafted cabinets and built-in features add to its charm and warmth. We call it 'Dacha' — a Russian term for a second home, typically in the countryside, where families go to relax and tend to their gardens. While it may have its quirks and the floor might squeak here and there, dacha is all about rest, simplicity, and cherished family time.\n\nRegistration Details\n2025-2255\nShow more",
        thirty_day: 40,
        sixty_day: 50,
        ninety_day: 31,
        created_at: "2025-09-05T20:43:03.988362+00:00",
      },
      {
        comp_id: "49aa4456-fd64-4fa4-9990-c94069b70ccb",
        property_id: "6916f319-0beb-4c2a-a3c4-e56c13c841f2",
        listing_id: "571886471103595371",
        overall_occupancy: 26,
        overall_genius_score: {
          title: {
            feedback: {
              items: [
                {
                  title: "Include Unique Selling Points",
                  feedback:
                    "Consider emphasizing unique features even more, like your spaciousness or proximity to attractions.",
                },
                {
                  title: "Optimize for Searchability",
                  feedback:
                    "Think about incorporating more specific keywords that potential guests might search for.",
                },
                {
                  title: "Shorter Titles Work Best",
                  feedback:
                    "While descriptive, a shorter title can sometimes make a stronger impression.",
                },
                {
                  title: "Highlighting Amenities",
                  feedback:
                    "Mentioning additional amenities like the outdoor grill or the welcoming space can attract more attention.",
                },
                {
                  title: "Focusing on Target Audience",
                  feedback:
                    "Is your target audience families, friends, or couples? Tailor your title to appeal directly to them.",
                },
              ],
              summary:
                "Your listing title effectively highlights key features and location, making it appealing to potential guests. However, it could benefit from some refinement to improve impact.",
            },
            revisions: [
              "Charming 3BR with Private Hot Tub & Garden - Walk to OSU!",
              "Spacious 3BR Getaway with Hot Tub - Near Schools & Nightlife!",
              "3BR Family-Friendly Retreat with Hot Tub + Garden - Minutes from OSU!",
            ],
            suggestions: [
              "Emphasize key amenities like 'Private Hot Tub'",
              "Consider a focus on 'Ideal for Groups'",
              "Include nearby attractions in a concise way",
              "Utilize the word 'Spacious' for a more inviting tone",
              "Briefly highlight the garden view for nature lovers",
            ],
            property_name: "Charming 3BR w/ Hot Tub + Garden | Near OSU + More",
            rating_number: 78,
            expert_ratings: [
              73, 84, 76, 70, 82, 79, 85, 80, 78, 77, 71, 88, 89, 75, 90, 72,
              76, 81, 73, 74, 68, 83, 87, 79, 70, 81, 78, 84, 88, 75, 90, 82,
              86, 89, 67, 76, 72, 73, 88, 91, 70, 78, 74, 85, 80, 91, 72, 76,
              83, 88, 74, 71, 80, 79, 87, 90, 68, 78, 79, 80, 88, 81, 76, 72,
              84, 82, 70, 88, 85, 73, 71, 85, 91, 76, 82, 78, 89, 84, 73, 76,
              77, 90, 88, 75, 81, 70, 73, 85, 90, 76, 81, 79, 84, 87, 86, 74,
              78, 76, 89, 82, 77, 74, 73, 80, 78, 82, 89, 75, 87, 84, 82, 91,
              89, 78, 73, 88,
            ],
            title_rewrites: [
              "Charming 3BR Retreat w/ Hot Tub & Garden - Steps from OSU!",
              "Spacious 3BR Home with Hot Tub + Garden - Perfect for Groups Near OSU",
              "Luxurious 3BR Escape: Private Hot Tub + Garden, Close to OSU",
            ],
            rating_category: "Satisfactory",
          },
          amenities: {
            feedback: {
              items: [
                {
                  title: "Scenic Views",
                  feedback:
                    "The scenic views from the property are a standout feature, enhancing the overall experience.",
                },
                {
                  title: "Entertainment Options",
                  feedback:
                    "The entertainment options, including a game console and a 55-inch HDTV, provide a great way to unwind after a day of exploring.",
                },
                {
                  title: "Comfort and Space",
                  feedback:
                    "The ample bedroom and laundry amenities ensure comfort, with extra pillows and bedding provided.",
                },
                {
                  title: "Kitchen Facilities",
                  feedback:
                    "A fully-equipped kitchen with a gas stove and a Keurig coffee machine allows guests to prepare meals easily.",
                },
                {
                  title: "Safety Features",
                  feedback:
                    "Extensive safety features, such as smoke and carbon monoxide alarms, offer peace of mind for guests.",
                },
              ],
              summary:
                "The amenities offered at this boutique stay are extensive and cater to a variety of guest needs, making it a desirable destination for travelers.",
            },
            revisions: null,
            suggestions: [
              "Consider adding more decorative touches to create a more inviting and personalized atmosphere.",
              "Provide local guides or brochures in the space to enhance the guest experience.",
              "Offer complimentary snacks or drinks to make guests feel more welcome.",
            ],
            property_name: "Boutique Stay with Scenic Views",
            rating_number: 75,
            expert_ratings: [
              70, 68, 65, 79, 62, 86, 65, 53, 88, 45, 72, 57, 94, 91, 66, 85,
              84, 64, 80, 66, 79, 77, 92, 55, 85, 79, 92, 78, 70, 61, 71, 73,
              94, 69, 92, 60, 77, 67, 74, 59, 55, 84, 92, 75, 67, 63, 49, 72,
              62, 81, 89, 82, 81, 78, 74, 86, 87, 64, 75, 64, 92, 59, 77, 76,
              85, 80, 72, 61, 77, 54, 70, 68, 67, 93, 78, 59, 99, 52, 67, 88,
              81, 83, 79, 90, 70, 53, 58, 76, 95, 89, 82, 64, 78, 75, 66, 84,
              88, 97, 96, 62, 74, 54, 60, 80, 71, 56, 93, 75, 45, 76, 66, 71,
              65, 90, 50, 61, 77, 89, 55, 99,
            ],
            rating_category: "Satisfactory",
          },
          hero_image: {
            feedback: {
              items: [
                {
                  title: "Inviting Atmosphere",
                  feedback:
                    "Your image beautifully conveys an inviting backyard setting with vibrant colors and cozy amenities.",
                },
                {
                  title: "Highlighting Features",
                  feedback:
                    "The hot tub and fire pit are well-highlighted, showcasing two of your key selling points.",
                },
                {
                  title: "Vibrant Colors",
                  feedback:
                    "The use of string lights and lush greenery adds a touch of vibrancy that catches the eye and sets a welcoming mood.",
                },
              ],
              summary:
                "Your hero image captures the essence of a relaxing getaway. Its vibrant colors and inviting amenities draw viewers in, making them envision their stay in your charming space. The image effectively highlights the appealing features like the hot tub and garden setting.",
            },
            revisions: null,
            suggestions: [
              "Consider adding a close-up shot of the hot tub to emphasize its features.",
              "Include images of the interior to showcase the spacious floor plan.",
              "Capture the front porch to highlight another appealing outdoor area.",
              "Consider a dusk or night-time shot to better display the lighting features.",
              "Use wide-angle shots to capture more of the garden area.",
            ],
            property_name: "Charming 3BR w/ Hot Tub + Garden | Near OSU + More",
            rating_number: 87,
            expert_ratings: [
              91, 87, 85, 89, 93, 88, 90, 86, 84, 92, 88, 85, 87, 89, 90, 86,
              88, 91, 87, 85, 88, 89, 92, 84, 90, 86, 87, 88, 89, 91, 92, 85,
              84, 86, 88, 85, 89, 87, 92, 91, 89, 88, 85, 87, 86, 89, 90, 92,
              84, 88, 87, 89, 90, 93, 84, 88, 91, 86, 85, 87, 88, 84, 92, 91,
              90, 89, 85, 87, 86, 88, 92, 89, 91, 87, 84, 85, 93, 90, 89, 86,
              85, 88, 91, 92, 89, 90, 87, 85, 86, 88, 90, 89, 92, 84, 87, 85,
              86, 88, 92, 91,
            ],
            rating_category: "Good",
          },
          description: {
            feedback: {
              items: [
                {
                  title: "Comprehensive Details",
                  feedback:
                    "You provided extensive details about the property that will help potential guests feel informed.",
                },
                {
                  title: "Great Amenities",
                  feedback:
                    "The amenities like the hot tub and backyard are enticing and stand out in your listing.",
                },
                {
                  title: "Clear Location Benefits",
                  feedback:
                    "Mentioning nearby attractions adds significant value and encourages bookings.",
                },
                {
                  title: "Host Profile",
                  feedback:
                    "Having a friendly and approachable host profile helps in building trust.",
                },
                {
                  title: "Handling of FAQs",
                  feedback:
                    "Addressing questions such as check-in times and cleanliness sets clear expectations.",
                },
              ],
              summary:
                "Your listing offers a charming and inviting atmosphere with great amenities that can appeal to various guests. However, there are slight improvements to make it more appealing.",
            },
            revisions: null,
            suggestions: [
              "Enhance the description of the backyard features to create a more vivid picture.",
              "Add testimonials or quotes from previous guests to enhance credibility.",
              "Incorporate localized activities or events happening during guests' stay.",
              "Highlight the distance to major attractions more prominently.",
              "Simplify the layout of your listing description for better readability.",
            ],
            property_name: "Charming 3BR w/ Hot Tub + Garden | Near OSU + More",
            rating_number: 85,
            expert_ratings: [
              70, 75, 65, 80, 78, 85, 87, 82, 76, 74, 67, 88, 66, 70, 95, 89,
              73, 94, 88, 83, 80, 71, 78, 85, 66, 79, 80, 73, 77, 81, 68, 70,
              82, 88, 67, 72, 91, 76, 72, 84, 78, 95, 86, 69, 82, 81, 80, 79,
              75, 92, 73, 84, 75, 69, 71, 88, 82, 90, 76, 84, 78, 93, 85, 65,
              70, 72, 88, 81, 78, 73, 68, 74, 87, 79, 81, 92, 66, 89, 75, 69,
              81, 91, 77, 72, 89, 85, 70, 95, 71, 76, 69, 83, 65, 87, 68, 75,
              71, 92, 76, 88, 85, 65, 69, 74, 77, 91, 82, 95, 79, 70, 84, 68,
              70, 77, 76, 91, 95, 75, 70, 73, 80, 79, 88, 89, 87, 85, 78,
            ],
            rating_category: "Good",
            description_rewrite: {
              guest_access:
                "Guests have access to the entire house, including the fenced backyard with hot tub and fire pit, and the garage with two parking spots. Please avoid the unfinished basement unless necessary.",
              your_property:
                "This stylish and spacious 3-bedroom home accommodates up to 7 guests comfortably with two queens and two full beds. Amenities include a fully equipped kitchen, 1.5 bathrooms, a hot tub, and a fire pit in a private backyard. Enjoy complimentary WiFi and a dedicated workspace for any remote needs.",
              listing_description:
                "Welcome to your charming 3-bedroom getaway just off Summit Street! Enjoy a spacious retreat with a hot tub, garden, and all the comforts of home. Convenience meets leisure here - you’re minutes away from OSU and the vibrant Short North. Fire up the grill in the backyard or unwind in the hot tub under fairy lights. Perfect for campus visits or enjoying Columbus!",
              other_details_to_note:
                "Check-in starts at 4:00 PM, and check-out is by 11:00 AM. The maximum occupancy is 7 guests, and pets are welcome! Please note that while cleaning is not required before your departure, a quick tidy-up is appreciated.",
              interaction_with_guests:
                "I'll be available through messaging for any questions during your stay and to ensure you have a seamless experience. I strive to provide personalized recommendations as a local host!",
            },
          },
          other_images: {
            feedback: {
              items: [
                {
                  title: "Vibrant Colors and Lighting",
                  feedback:
                    "Your photos use vibrant colors and excellent lighting that highlight the unique character of your property.",
                },
                {
                  title: "Appealing Composition",
                  feedback:
                    "The composition of each photo is well-thought-out, providing a comprehensive view of each space.",
                },
                {
                  title: "Showcases Key Features",
                  feedback:
                    "You effectively showcase the property's key features, making it appealing to potential guests.",
                },
              ],
              summary:
                "Your photos beautifully capture the essence and charm of your boutique stay, showcasing its warm and inviting atmosphere.",
            },
            revisions: null,
            suggestions: [
              "Add some evening shots with softer lighting to create a cozy atmosphere.",
              "Include close-up images of unique decor elements to highlight details.",
              "Capture photos of guest interaction areas, like the dining setup, to add a personal touch.",
            ],
            property_name: "Boutique Stay",
            rating_number: 86,
            expert_ratings: [
              89, 85, 87, 86, 88, 83, 90, 84, 88, 87, 86, 85, 82, 89, 84, 83,
              87, 91, 88, 85, 83, 86, 84, 89, 88, 87, 86, 83, 89, 88, 85, 87,
              84, 83, 88, 90, 87, 86, 89, 85, 84, 87, 88, 83, 89, 85, 87, 86,
              88, 83, 85, 87, 89, 88, 86, 84, 85, 87, 88, 89, 84, 86, 87, 83,
              88, 89, 85, 82, 87, 88, 86, 84, 89, 87, 88, 85, 84, 87, 85, 88,
              89, 83, 85, 87, 86, 89, 84, 88, 87, 86, 85, 87, 88, 89, 83, 87,
              88, 84, 86, 87,
            ],
            rating_category: "Good",
          },
          interior_design: {
            feedback: {
              items: [
                {
                  title: "Color Palette",
                  feedback:
                    "The color palette is pleasant but could be more unified throughout the space for a modern touch.",
                },
                {
                  title: "Furniture Arrangement",
                  feedback:
                    "The furniture arrangement is functional; however, a more open layout could improve traffic flow and openness.",
                },
                {
                  title: "Decor Elements",
                  feedback:
                    "Some decor feels outdated and doesn't match the upscale vibe of the hot tub and garden, consider updating.",
                },
                {
                  title: "Lighting Options",
                  feedback:
                    "While you have good natural light, additional ambient lighting could enhance the atmosphere in the evenings.",
                },
                {
                  title: "Flooring",
                  feedback:
                    "Flooring is practical, yet introducing area rugs could add warmth and texture to the bedrooms.",
                },
              ],
              summary:
                "Your interior design presents a good overall aesthetic with some appealing features, but there are elements that could be enhanced for a more cohesive feel.",
            },
            revisions: null,
            suggestions: [
              "Consider selecting a more cohesive color scheme across all rooms.",
              "Rearrange the furniture to create a more spacious feeling, especially in the living area.",
              "Update decor items to reflect a modern aesthetic that enhances the hot tub setting.",
              "Incorporate more layered lighting options to improve the ambiance at night.",
              "Add area rugs in bedrooms for warmth and comfort.",
            ],
            property_name: "Charming 3BR w/ Hot Tub + Garden | Near OSU + More",
            rating_number: 72,
            expert_ratings: [
              83, 72, 65, 91, 80, 68, 78, 75, 87, 67, 88, 79, 55, 66, 93, 62,
              74, 70, 53, 89, 76, 61, 81, 57, 86, 58, 92, 75, 84, 63, 88, 50,
              95, 59, 73, 66, 85, 80, 47, 82, 54, 78, 91, 71, 64, 68, 97, 69,
              52, 77, 66, 89, 75, 81, 76, 74, 65, 84, 57, 72, 95, 64, 90, 77,
              51, 62, 83, 61, 70, 87, 94, 58, 73, 76, 53, 88, 81, 66, 59, 65,
              80, 45, 67, 93, 56, 79, 88, 72, 61, 82, 69, 74, 54, 70, 61, 86,
              89, 95, 92, 44, 68, 97, 53, 85, 78, 56, 63, 65, 79, 66, 90, 68,
            ],
            rating_category: "Satisfactory",
          },
          overall_ratings: {
            feedback: {
              items: [],
              summary:
                "Based on analysis of all categories, this property scores 81/99. The rating considers hero image (20%), title (17.5%), other images (17.5%), description (15%), amenities (15%), and interior design (15%).",
            },
            revisions: null,
            suggestions: [
              "Focus on improving the lowest-rated categories for maximum impact",
              "Maintain strengths in your highest-performing areas",
              "Consider the weighted importance when prioritizing improvements",
            ],
            property_name: "Overall Property Rating",
            rating_number: 81,
            expert_ratings: [
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81,
              81, 81, 81, 81,
            ],
            rating_category: "Good",
          },
        },
        bedrooms: "3 bedrooms",
        average_review: 4.95,
        number_of_reviews: 4,
        policies: {
          house_rules:
            "Things to know\nHouse rules\nCheck-in after 4:00 PM\nCheckout before 11:00 AM\n7 guests maximum\nShow more\nSafety & property\nExterior security cameras on property\nPool/hot tub without a gate or lock\nCarbon monoxide alarm\nShow more\nCancellation policy\nAdd your trip dates to get the cancellation details for this stay.\nAdd dates",
          cancellation_policy:
            "strict ⎯▹ 5 min drive Art galleries bars dining and local shops Ohio State University ⎯▹ 5 min drive Campus stadium and Wexner Medical Center North Market Downtown ⎯▹ 8 min drive Local food stalls vendors and casual bites Franklin Park Conservatory ⎯▹ 10 min drive Gardens art exhibits and glasshouses German Village ⎯▹ 12 min drive Historic streets restaurants and bakeriesNearby Dining ~ Brassica (Mediterranean) ⎯▹ 6 min drive Mouton (Cocktail Bar) ⎯▹ 6 min drive Northstar Café (Americ",
          self_checkin: true,
          self_checkin_details: "Self check-in",
          instant_book: false,
          pets_allowed: true,
        },
        hero_image_link:
          "https://a0.muscache.com/im/pictures/miso/Hosting-571886471103595371/original/5df18cee-c30f-4140-bfd5-907cc6ce1567.jpeg?im_w=720",
        title:
          "Charming 3BR w/ Hot Tub + Garden | Near OSU + More\nShare\nSave",
        description:
          'At this extra-roomy 3BR just off Summit Street, you’re minutes from OSU, the Short North, and all the best of central Columbus. Fire up the backyard grill, soak in the hot tub under string lights, or stretch out on the deep sectional for movie night. Two queens, two fulls, and a private fenced yard make this a perfect getaway for visiting campus, game day, and just enjoying the city.\n\nThe space\n• 3 bedrooms:\n ⎯▹ Bedroom 1: 2 Full beds (third floor)\n ⎯▹ Bedroom 2: 1 Queen bed\n ⎯▹ Bedroom 3: 1 Queen bed\n\n • 1.5 bathrooms\n • Fully equipped kitchen\n • Covered front porch + private back deck\n • Hot tub + fire pit\n • Private, fenced backyard w/ garden view\n • Off-street parking for 3 cars, including 2 garage spots\n • Free WiFi + dedicated workspace\n • 55" HDTV w/ Netflix + Roku\n • Central air + heat\n • In-unit washer + dryer\n • Exterior security cameras\n • No cleaning checklist required\n\nExperience Overview ~\n • Fully remodeled 2,000 sq ft layout\n • Spacious open floorplan ideal for groups\n • Backyard with hot tub, fire pit, and fairy lights\n • Walkable to bars, restaurants, and nightlife\n • Less than 10 min to OSU, downtown + Convention Center\n\nNearby Things to Do ~\n Short North Arts District ⎯▹ 5 min drive\n Art galleries, bars, dining, and local shops\n\n Ohio State University ⎯▹ 5 min drive\n Campus, stadium, and Wexner Medical Center\n\n North Market Downtown ⎯▹ 8 min drive\n Local food stalls, vendors, and casual bites\n\n Franklin Park Conservatory ⎯▹ 10 min drive\n Gardens, art exhibits, and glasshouses\n\n German Village ⎯▹ 12 min drive\n Historic streets, restaurants, and bakeries\n\nNearby Dining ~\n Brassica (Mediterranean) ⎯▹ 6 min drive\n Mouton (Cocktail Bar) ⎯▹ 6 min drive\n Northstar Café (American) ⎯▹ 7 min drive\n Fox in the Snow (Bakery) ⎯▹ 8 min drive\n Skillet (Farm-to-Table) ⎯▹ 10 min drive\n\nFAQs\n➤ Is the hot tub private?\n Yes — located in the fully fenced backyard\n➤ Is parking available?\n Yes — garage fits 2 cars + 1 off-street spot\n➤ Any house quirks?\n Third floor can get warm + slightly musty — noted in reviews\n➤ Do I need to clean before check-out?\n No cleaning checklist required\n➤ Can I bring pets?\n Yes — pets allowed\n\n❤️ Meet Your Host\n\nI’m a longtime Superhost and Columbus local. I’m here to make sure you have a seamless and relaxing stay. Questions? Just reach out!\n\nYour host,\n —Darren\n\nGuest access\nGuests have full access to the house, backyard, hot tub, and garage. Basement is unfinished — please avoid unless necessary.\n\nOther things to note\n• Check-in after 4:00 PM (Keypad entry)\n• Check-out before 11:00 AM\n• Max occupancy: 7 guests\n• Pets allowed\n• Smoke + carbon monoxide alarms installed\n• Pool/hot tub not gated\n• Exterior security cameras installed\n• Columbus Rental Registration No: 2024-2981\n\nRegistration Details\n2024-2981\nShow more',
        thirty_day: 30,
        sixty_day: 37,
        ninety_day: 8,
        created_at: "2025-09-05T20:43:57.043198+00:00",
      },
      {
        comp_id: "6d6d3bb3-e8ad-4556-aad7-00d6d4b8f85d",
        property_id: "c31a25b4-7b77-4e7e-ae0f-da3f542a166a",
        listing_id: "568134460455059799",
        overall_occupancy: 8,
        overall_genius_score: {
          title: {
            feedback: {
              items: [
                {
                  title: "Location Emphasis",
                  feedback:
                    "The title does a great job of emphasizing the proximity to OSU, which is a key selling point for potential guests.",
                },
                {
                  title: "Clarity of Beds and Baths",
                  feedback:
                    "Clearly mentioning the number of bedrooms and bathrooms is helpful for prospective visitors in assessing the space.",
                },
                {
                  title: "Lack of Creativity",
                  feedback:
                    "Consider enhancing the title with more creative language to make it more appealing and memorable.",
                },
              ],
              summary:
                "This title effectively highlights the property's main attractions and is likely to grab the attention of potential guests. However, it could be worded a bit more creatively.",
            },
            revisions: [
              "Perfect Family Retreat: 3 Bed/2.5 Bath Home Walkable to OSU!",
              "Pet-Friendly 3 Bed/2.5 Bath Steps from OSU!",
              "Your Home Away from Home: 3 Bed/2.5 Bath Just Off Campus!",
            ],
            suggestions: [
              "Make the title more engaging with unique descriptors about the home.",
              "Consider emphasizing features like 'pet-friendly' in the title.",
              "Use adjectives that convey comfort and family-friendliness.",
            ],
            property_name: "WALK TO OSU! 3 Bed/2.5 Bath Home just off campus!",
            rating_number: 82,
            expert_ratings: [
              71, 68, 70, 85, 76, 82, 74, 90, 66, 80, 78, 81, 88, 72, 65, 83,
              69, 75, 94, 73, 71, 68, 63, 85, 79, 64, 74, 91, 70, 82, 75, 88,
              69, 76, 72, 84, 67, 89, 81, 66, 73, 78, 64, 83, 92, 71, 74, 86,
              77, 80, 69, 83, 75, 66, 90, 72, 68, 94, 89, 76, 82, 84, 78, 70,
              67, 73, 81, 80, 64, 86, 75, 88, 81, 87, 83, 70, 88, 74, 92, 68,
              77, 80, 68, 76, 89, 81, 70, 85, 73, 84, 72, 66, 77, 88, 70, 75,
              68, 74, 94, 65, 72, 86, 82, 69, 81, 79, 83, 70, 90, 88,
            ],
            title_rewrites: [
              "Steps from OSU! Cozy 3 Bed/2.5 Bath Home for Families!",
              "Charming 3 Bed/2.5 Bath Home, Just a Walk to OSU!",
              "Family-Friendly 3 Bed/2.5 Bath Home Near OSU & Downtown!",
            ],
            rating_category: "Good",
          },
          amenities: {
            feedback: {
              items: [
                {
                  title: "Bathroom Supplies",
                  feedback:
                    "You provide basic essentials such as shampoo and conditioner, but consider offering higher quality brands or additional luxury items.",
                },
                {
                  title: "Entertainment Options",
                  feedback:
                    "While you have a TV, consider adding streaming subscriptions or more diverse reading materials for entertainment.",
                },
                {
                  title: "Safety Measures",
                  feedback:
                    "The presence of security cameras is noted; however, the description might raise concerns for potential guests regarding privacy. It’s important to address how their presence will not invade personal space.",
                },
              ],
              summary:
                "Your property listing presents a wide variety of amenities that are appealing and well-suited for guests looking for comfort and convenience. However, there are a few areas where enhancement could elevate the guest experience further.",
            },
            revisions: null,
            suggestions: [
              "Consider enhancing the bathroom amenities with more luxury brands.",
              "Add streaming services or more entertainment options in your property.",
              "Reevaluate the wording around security cameras to clarify guest privacy.",
            ],
            property_name: "Premium Stay",
            rating_number: 66,
            expert_ratings: [
              26, 67, 89, 54, 71, 35, 47, 88, 77, 39, 12, 67, 33, 69, 53, 45,
              50, 87, 38, 31, 68, 26, 99, 66, 74, 61, 59, 13, 73, 17, 66, 83,
              77, 45, 12, 76, 80, 91, 83, 99, 29, 34, 42, 48, 70, 41, 50, 48,
              83, 66, 71, 13, 33, 71, 77, 28, 88, 53, 11, 72, 74, 43, 96, 41,
              31, 48, 38, 47, 98, 69, 47, 81, 78, 56, 62, 51, 89, 24, 61, 66,
              84, 78, 18, 45, 34, 54, 20, 67, 52, 45, 54, 43, 61, 74, 66, 99,
              36, 32, 66, 39, 43, 27, 37, 81, 96, 81, 20, 93, 76, 48, 52,
            ],
            rating_category: "Needs Work",
          },
          hero_image: {
            feedback: {
              items: [
                {
                  title: "Welcoming Atmosphere",
                  feedback:
                    "The living area looks warm and inviting, with comfortable seating and tasteful decor, which makes it appealing for potential guests.",
                },
                {
                  title: "Spacious Layout",
                  feedback:
                    "The image showcases a spacious open-layout connecting the living and dining area, highlighting the room's potential for family gatherings or group activities.",
                },
                {
                  title: "Bright and Airy",
                  feedback:
                    "The room appears bright and airy, thanks to the ample natural light coming through the windows, enhancing the overall atmosphere.",
                },
              ],
              summary:
                "The hero image effectively presents a welcoming and spacious living area, making it appealing for families or groups visiting the area. The image captures an inviting space with a comforting vibe, which aligns well with the description.",
            },
            revisions: null,
            suggestions: [
              "Add a pop of color through additional cushions or decor items to make the space more vibrant.",
              "Showcase other angles of the living area to provide a better sense of space.",
              "Include an evening shot with soft lighting to highlight ambiance.",
              "Ensure windows are shown clearly to enhance the view of natural light.",
              "Consider a wide-angle shot to encompass more of the room's features.",
            ],
            property_name: "WALK TO OSU! 3 Bed/2.5 Bath Home just off campus!",
            rating_number: 84,
            expert_ratings: [
              90, 85, 82, 88, 84, 79, 87, 83, 86, 81, 89, 80, 83, 84, 85, 82,
              83, 88, 80, 87, 81, 89, 79, 86, 83, 85, 82, 88, 83, 79, 87, 85,
              84, 82, 80, 86, 83, 88, 81, 84, 87, 82, 85, 90, 81, 83, 88, 80,
              87, 83, 86, 81, 84, 82, 85, 88, 80, 84, 79, 88, 83, 89, 80, 85,
              87, 82, 84, 83, 88, 81, 87, 83, 86, 82, 84, 81, 89, 85, 82, 87,
              80, 83, 86, 79, 88, 84, 85, 82, 80, 87, 83, 90, 81, 86, 84, 90,
              79, 83, 88, 85, 84, 82,
            ],
            rating_category: "Good",
          },
          description: {
            feedback: {
              items: [
                {
                  title: "Clear Structure",
                  feedback:
                    "Consider organizing the listing into clear sections with headers for ease of reading.",
                },
                {
                  title: "Engaging Language",
                  feedback:
                    "Use more inviting and vivid language to enhance the overall appeal of the description.",
                },
                {
                  title: "Highlight Unique Features",
                  feedback:
                    "Emphasize any unique aspects that might attract potential guests.",
                },
                {
                  title: "Convey Warmth",
                  feedback:
                    "Incorporate a sense of hospitality that makes potential guests feel welcome.",
                },
                {
                  title: "Tone Down Security Language",
                  feedback:
                    "While safety is important, use a friendlier tone regarding security measures to maintain an inviting atmosphere.",
                },
              ],
              summary:
                "Your property listing showcases many appealing features but could benefit from a more engaging and organized presentation.",
            },
            revisions: [
              "Change the listing title to 'Charming Family Home Steps from OSU - Pet Friendly!' for a more engaging appeal.",
              "Revise the introduction to focus more on the vibrant atmosphere and local attractions.",
              "Incorporate a welcome message that conveys warmth and hospitality to encourage bookings.",
            ],
            suggestions: [
              "Revise the listing title to include a catchy phrase, like 'Perfect Family Getaway Near OSU'.",
              "Reorganize the list of features and amenities for clarity, potentially using bullet points.",
              "Enhance the description with vivid language that paints a picture of an enjoyable stay.",
              "Add a personal touch or a story about the home to create a connection with potential guests.",
              "Remove or soften the language about security cameras to focus on guest safety while remaining inviting.",
            ],
            property_name: "The Summit",
            rating_number: 69,
            expert_ratings: [
              62, 58, 54, 72, 88, 63, 64, 77, 75, 53, 69, 66, 61, 76, 82, 51,
              85, 65, 66, 59, 78, 67, 63, 60, 71, 84, 91, 79, 47, 48, 49, 59,
              74, 68, 87, 78, 82, 64, 73, 66, 89, 49, 54, 80, 56, 64, 75, 58,
              42, 88, 62, 70, 53, 61, 92, 55, 76, 73, 88, 54, 57, 63, 61, 74,
              72, 54, 89, 65, 84, 66, 75, 66, 44, 72, 84, 66, 58, 59, 55, 69,
              48, 61, 68, 66, 50, 73, 70, 66, 64, 70, 81, 63, 99, 65, 41, 58,
              66, 70, 69, 75, 46, 79, 56, 48, 67, 52, 48, 76, 64, 61, 51, 49,
              57, 87, 70, 61, 48, 77, 60, 89, 64, 63, 45, 67, 68, 61, 60, 61,
            ],
            rating_category: "Needs Work",
            description_rewrite: {
              guest_access:
                "Guests have complete access to the entire home—including a well-equipped kitchen, dining area, living room, and charming outdoor space. Parking is available with two off-street spaces, plus plenty of free street parking nearby.",
              your_property:
                "This inviting home features a spacious open floor plan, highlighted by a welcoming front porch. The fully stocked kitchen is perfect for preparing meals, and the cozy living space has a SmartTV for your entertainment. A fenced yard and off-street parking ensure your comfort throughout your stay.",
              listing_description:
                "WALK TO OSU! Welcome to The Summit, a cozy pet-friendly 3 bed/2.5 bath home just steps from OSU, Short North, and downtown. Enjoy a quick 10-minute stroll to OSU, perfect for family visits and football games! With a king bed, two queen beds, and a pull-out sofa, there's ample space to unwind after a day of exploring. Equipped with a SmartTV to stream your favorites, you’ll feel right at home!",
              other_details_to_note:
                "We charge a non-refundable $50 fee for pets. No cats are allowed due to allergies, and we enforce a no-smoking policy. Security cameras are in place for your safety, situated at the front and rear of the property.",
              interaction_with_guests:
                "I'm here to assist you during your stay! Don’t hesitate to reach out with questions or for local recommendations to enhance your visit.",
            },
          },
          other_images: {
            feedback: {
              items: [
                {
                  title: "Lighting",
                  feedback:
                    "You've nailed the lighting perfectly. It brings out the charm in every room and emphasizes the natural brightness of your space.",
                },
                {
                  title: "Composition",
                  feedback:
                    "The composition in these photos is spot on. Each space is framed in a way that highlights its best features, giving potential guests a clear view of the layout and ambiance.",
                },
                {
                  title: "Detail",
                  feedback:
                    "The attention to detail shines through in these photos. By focusing on both broad views and closer elements, you show the quality and comfort of your accommodation.",
                },
              ],
              summary:
                "The photos showcase the property beautifully, highlighting its spaciousness and modern appeal. The lighting and angles used in the photography accentuate the details and make the space look inviting and clean.",
            },
            revisions: null,
            suggestions: [
              "Consider adding a few more perspective shots to showcase the property's location and surroundings.",
              "Include some lifestyle shots to give guests an idea of how they could enjoy the space.",
              "Try experimenting with some evening or nighttime shots to highlight different lighting atmospheres.",
              "Incorporate a few more images that showcase unique or stylish decor pieces to add character to the listing.",
            ],
            property_name: "Premium Stay",
            rating_number: 88,
            expert_ratings: [
              91, 89, 85, 87, 92, 86, 88, 90, 88, 87, 90, 89, 92, 84, 88, 91,
              85, 87, 89, 86, 93, 89, 90, 88, 85, 86, 92, 91, 87, 88, 86, 89,
              90, 84, 88, 85, 87, 92, 90, 91, 86, 87, 88, 91, 85, 89, 86, 87,
              88, 84, 92, 91, 89, 85, 88, 90, 87, 86, 88, 85, 91, 89, 90, 88,
              86, 87, 89, 92, 85, 86, 87, 91, 88, 90, 89, 87, 85, 91, 88, 87,
              92, 89, 85, 88, 87, 90, 91, 86, 87, 89, 85, 92, 91, 88, 86, 90,
              87, 89, 88, 86,
            ],
            rating_category: "Good",
          },
          interior_design: {
            feedback: {
              items: [
                {
                  title: "Furniture Arrangement",
                  feedback:
                    "The furniture arrangement is practical but could be better organized to enhance flow and conversation spaces.",
                },
                {
                  title: "Color Palette",
                  feedback:
                    "The neutral color scheme is quite safe. Consider introducing some vibrant colors through decor to liven up the space.",
                },
                {
                  title: "Lighting Options",
                  feedback:
                    "Some areas could benefit from softer lighting, as the current setup is rather stark and might not create the warm atmosphere guests seek.",
                },
                {
                  title: "Decor Elements",
                  feedback:
                    "Further decorative elements, such as artwork or stylish accessories, would elevate the space and make it more inviting.",
                },
                {
                  title: "Outdoor Space",
                  feedback:
                    "The outdoor area has potential but could be enhanced with comfortable seating options and decorative touches.",
                },
              ],
              summary:
                "The interior design of this property showcases a blend of comfort and functionality, making it suitable for family visits. However, there are opportunities to enhance its aesthetic appeal and overall ambiance.",
            },
            revisions: null,
            suggestions: [
              "Incorporate colorful accent pillows or wall art to create visual interest.",
              "Replace harsh lighting with softer options for a more inviting environment.",
              "Rearrange furniture for improved flow and conversation areas.",
              "Add decorative elements to personalize the space and make it feel more welcoming.",
              "Upgrade outdoor furniture with cushions to add comfort for guests. ",
            ],
            property_name: "WALK TO OSU! 3 Bed/2.5 Bath Home just off campus!",
            rating_number: 77,
            expert_ratings: [
              79, 75, 68, 82, 74, 66, 88, 90, 73, 85, 67, 71, 78, 76, 94, 70,
              86, 61, 77, 87, 64, 65, 83, 63, 89, 93, 74, 66, 82, 95, 92, 80,
              68, 96, 64, 79, 88, 64, 76, 85, 69, 60, 81, 75, 90, 83, 72, 91,
              62, 68, 88, 85, 89, 78, 90, 66, 81, 67, 94, 78, 73, 82, 66, 88,
              70, 63, 95, 72, 77, 81, 77, 69, 86, 94, 60, 89, 60, 95, 88, 81,
              93, 88, 66, 75, 67, 61, 92, 65, 82, 77, 87, 60, 70, 71, 74, 84,
              86, 84, 90, 61, 96, 72, 76, 88, 78, 83, 82, 69, 87, 78, 69, 69,
              90, 99, 99, 66,
            ],
            rating_category: "Satisfactory",
          },
          overall_ratings: {
            feedback: {
              items: [],
              summary:
                "Based on analysis of all categories, this property scores 78/99. The rating considers hero image (20%), title (17.5%), other images (17.5%), description (15%), amenities (15%), and interior design (15%).",
            },
            revisions: null,
            suggestions: [
              "Focus on improving the lowest-rated categories for maximum impact",
              "Maintain strengths in your highest-performing areas",
              "Consider the weighted importance when prioritizing improvements",
            ],
            property_name: "Overall Property Rating",
            rating_number: 78,
            expert_ratings: [
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
              78, 78, 78, 78,
            ],
            rating_category: "Satisfactory",
          },
        },
        bedrooms: "3 bedrooms",
        average_review: 4.9,
        number_of_reviews: 109,
        policies: {
          house_rules:
            "Things to know\nHouse rules\nCheck-in after 4:00 PM\nCheckout before 10:00 AM\n9 guests maximum\nShow more\nSafety & property\nExterior security cameras on property\nCarbon monoxide alarm\nSmoke alarm\nShow more\nCancellation policy\nAdd your trip dates to get the cancellation details for this stay.\nAdd dates",
          cancellation_policy: "cancellation without refund for non-compliance",
          self_checkin: true,
          self_checkin_details: "Self check-in",
          instant_book: false,
          pets_allowed: true,
        },
        hero_image_link:
          "https://a0.muscache.com/im/pictures/miso/Hosting-568134460455059799/original/ce8925fe-b5b3-4fa4-bfb4-f8383f9ed7fc.jpeg?im_w=720",
        title: "WALK TO OSU! 3 Bed/2.5 Bath Home just off campus!\nShare\nSave",
        description:
          'WELCOME to The Summit, pet-friendly 3 bd/2.5 bath private home just steps away from OSU/Short North/Downtown, & all they have to offer!  ONLY 10 minute walk to OSU, perfect for families coming to visit or going to football games! 1 king bed, 2 queen beds, & a pull out sofa; you\'ll find plenty of spaces to relax after a fun day in Columbus! SmartTV to stream your favorite shows! Fenced in yard & parking! No smoking/outside guests permitted, outdoor security cameras present, see full description.\n\nThe space\nThis beautiful home has a large, open floor plan on the first floor with a central staircase.  The spacious first front porch and entryway welcomes you into the home.  The large kitchen is stocked with pots and pans, cooking utensils, and a full set of dishes and silverware.  Pull-out sofa near the dining room allows for extra sleeping space.  Living room with sofa, recliner, and smart tv for entertainment.  Dining room offers comfortable seating for 4. \n\n*1 King bed, 2 queen beds, 2.5 bath\n*Washer and Dryer\n*Pet Friendly, Fenced in yard\n*2 off street parking spaces (larger SUVs/Trucks can probably only fit 1)\n*Free Street Parking across the street or paid parking on the side street\n*Outdoor Seating\n*Walking Distance to High St., OSU, & Short North.\n\nUpstairs includes three bedrooms and two full baths. The master bedroom features a king bed and private bath with a walk-in shower and walk-in closet! Guest bedrooms hosts queen beds and share a bathroom between them.\n\nWhile we are dog friendly, we do charge a non-refundable $50/pet fee that will be added on to the booking.  Unfortunately, no cats are allowed due to severe allergies. The pet fee helps off-set the extra time it takes our cleaning crew to make our space "sparkling clean" again after hosting your pets!\n\nWe have installed exterior security cameras for the safety of guests and property. These cameras are located on the front door and on the rear of the house and actively record both audio and video of the front porch, back porch, and back yard.  Any tampering with cameras, including, but not limited to covering and otherwise disabling of these cameras are grounds for early termination of the reservation with no refunds whatsoever. \n\nWe do not allow smoking of any kind, events, or parties in our property.  Any violation of these rules may result in early termination of the reservation without refund.\n\nRegistration Details\n2022-2121\nShow more',
        thirty_day: 13,
        sixty_day: 7,
        ninety_day: 4,
        created_at: "2025-09-05T20:43:38.746103+00:00",
      },
    ],
    market_spy_run: {
      id: "192d3cbd-7624-4fef-832f-b6d414999432",
      created_at: "2025-09-05T20:40:40.921546+00:00",
      updated_at: "2025-09-05T20:40:40.921546+00:00",
      profile_id: "065bc5ee-bdea-41cc-901a-77e2fea58388",
      scan_id: "mf7aus6gkea5zx",
      address:
        "Ohio Expo Center & State Fairgrounds, 717 East 17th Avenue, Columbus, OH 43211, United States of America",
      geocode: "40.0029556, -82.99131821341493",
      started_at: "2025-09-05T20:40:40.743+00:00",
      completed_at: "2025-09-05T20:46:55.158+00:00",
      execution_time_ms: 374415,
      scraping_time_ms: 198632,
      assessment_time_ms: 175783,
      target_listings: 4,
      listings_found: 4,
      listings_assessed: 4,
      status: "completed",
      error_message: null,
      form_data: {
        bedrooms: "3+",
        room_type: "entire home",
        zoom_level: 50,
        length_of_stay: "1 night stay - tomorrow with 14 day window",
      },
    },
  },
};

// Export the full report structure
export const MockMarketSpyReport = MockMarketSpyReportData;

// Export just the comps array for use with CompsTable component
export const MockMarketSpyComps = MockMarketSpyReportData.data.comps;
