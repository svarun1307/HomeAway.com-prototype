-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2018 at 06:33 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `home_away_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(90) NOT NULL,
  `property_id` text NOT NULL,
  `user_id` text NOT NULL,
  `startBook` text NOT NULL,
  `endBook` text NOT NULL,
  `bookedOn` text NOT NULL,
  `ex1` text NOT NULL,
  `ex2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `property_id`, `user_id`, `startBook`, `endBook`, `bookedOn`, `ex1`, `ex2`) VALUES
(10, '37300970-c83f-11e8-8b09-eb62f01f6cef', 'e5592250-c846-11e8-aa67-0575140a7555', '1539241200000', '1539846000000', '4', '', ''),
(11, '86e26510-cab7-11e8-9954-d92365983c83', 'e5592250-c846-11e8-aa67-0575140a7555', '1539241200000', '1539846000000', '1538975863844', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `uniqueid` text NOT NULL,
  `location` text NOT NULL,
  `headline` text NOT NULL,
  `propdesc` text NOT NULL,
  `type` text NOT NULL,
  `bedrooms` text NOT NULL,
  `accomodates` text NOT NULL,
  `bathrooms` text NOT NULL,
  `photocount` text NOT NULL,
  `startDate` text NOT NULL,
  `endDate` text NOT NULL,
  `currency` text NOT NULL,
  `nights` text NOT NULL,
  `baseRate` text NOT NULL,
  `userid` text NOT NULL,
  `username` text NOT NULL,
  `timeadded` text NOT NULL,
  `ex1` text NOT NULL,
  `ex2` text NOT NULL,
  `ex3` text NOT NULL,
  `ex4` text NOT NULL,
  `ex5` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `uniqueid`, `location`, `headline`, `propdesc`, `type`, `bedrooms`, `accomodates`, `bathrooms`, `photocount`, `startDate`, `endDate`, `currency`, `nights`, `baseRate`, `userid`, `username`, `timeadded`, `ex1`, `ex2`, `ex3`, `ex4`, `ex5`) VALUES
(1, 'f17800f0-bd7f-11e8-8c7e-274b39c1f69f', 'San Jose', 'Avalon Morrison Park', 'GOOD PROPERTY', 'LEASING', '2', '5', '3', '2', '1537660800000', '1538352000000', '$', '8', '457', '', '', '1537521784447', 'Swimming Pool,Gym', '1120', '', '', ''),
(2, 'e35ebb20-bd80-11e8-8c7e-274b39c1f69f', 'San Jose', 'eajds', 'this is a test demo', 'house', '4', '4', '4', '2', '1537660800000', '1538438400000', '', '2', '2', '', '', '1537522190290', 'good, test', '3331', '', '', ''),
(3, '5e22cd10-bd81-11e8-8c7e-274b39c1f69f', 'san jose', 'tst', 'asdasmd', 'klmf', '31', '31', '31', '2', '1537747200000', '1538524800000', '€', '3', '31131', '', '', '1537522396257', 'a3', '442', '', '', ''),
(4, '511845e0-bd87-11e8-ac6b-2bd6f5db6258', 'Los Angeles', 'asd', 'asd', 'home', '3', '31', '3', '2', '1537833600000', '1538784000000', '$', '7', '345', '', '', '1537524951357', '13asd', '313', '', '', ''),
(5, 'b337bfd0-bd87-11e8-ac6b-2bd6f5db6258', 'LoS asd ', 'asd', 'asdasd', 'home', '3', '3', '3', '2', '1537660800000', '1538697600000', '€', '5', '2331', '', '', '1537525115981', 'sad', '3144', '', '', ''),
(6, 'bcc52a00-bd88-11e8-ac6b-2bd6f5db6258', 'Local', 'Heanaejnd', 'asd asd', '3home', '3', '3', '3', '2', '1537660800000', '1538611200000', '€', '31', '31', '', '', '1537525561504', '4', '3131', '', '', ''),
(7, '06438e60-bd89-11e8-ac6b-2bd6f5db6258', 'asdas', 'asd', 'asd', 'asd', '3', '4', '14', '2', '1537747200000', '1538697600000', '$', '2', '7313', '', '', '1537525684806', '31asd,asdasd,313', '422', '', '', ''),
(8, '5422dbe0-bd89-11e8-ac6b-2bd6f5db6258', 'tetadmklad', 'jkwqnjk', 'jnwkfnwken', '3', '31', '3', '4', '2', '1537660800000', '1538697600000', '$', '3', '3131', '', '', '1537525815454', '4mklf', '3913', '', '', ''),
(9, '643f4b70-bdda-11e8-b5ec-a132b4826137', 'san ', 'cc', 'ad', 'das', '31', '31', '4', '2', '1537660800000', '1538697600000', '€', '3500', '3500', '', '', '1537560631719', '4', '3131', '', '', ''),
(10, 'e1e93f40-bdda-11e8-b5ec-a132b4826137', 'San Jose', 'Avalon', 'San Jose', 'Home', '3', '6', '3', '2', '1537920000000', '1538697600000', '€', '675', '897', '', '', '1537560842548', 'House', '5', '', '', ''),
(12, 'eef64960-c2b4-11e8-a9ad-f964e5710152', 'sAN JOSE', 'Villa Torino', 'Location, location, location! Bring your boat, lake toys, and bikes! Enjoy private, level, sandy shoreline and private dock on West Battle Lake. The Glendalough Trail is steps from the front door. Perfect for running, walking or biking. Furnished with a full kitchen, washer/dryer, renovated bathroom, and new paint/flooring, this property is your perfect vacation destination. Minutes from shopping and dining in downtown Battle Lake, boat launch, Lions Park, and Glendalough State Park. Stay and relax!', 'Villa', '4', '7', '3', '4', '1538352000000', '1539129600000', '$', '4', '456', '', '', '1538094299382', 'Children,Welcome,Parking,Linens Provided,No Smoking,Oven or Stove Washer', '2300', '', '', ''),
(14, '37300970-c83f-11e8-8b09-eb62f01f6cef', 'Nice brand new entire house', '2 bedroom, 2 bath, living room, full kitchen, laundry room, central air & heat', 'n a safe neighborhood & behind our main house with total privacy and detached from us, this new house is located in the heart of Silicon Valley, close to Santa Clara Conversion Center, Levi\'s Stadium, Great America, Mission College, and many Hi-tech companies. You’ll love my place because of the 2 bathrooms, comfy beds, coziness, full kitchen with new appliances, laundry room with new washer and dryer, very clean. My place is good for couples, solo adventurers, business travelers, and families.', 'House', '4', '5', '3', '2', '1538784000000', '1541116800000', '$', '3', '5800', '369b8710-c83e-11e8-ab9f-5d885b16c598', '', '1538703446919', 'Air Conditioning ,Clothes Dryer,Hair Dryer,Heating', '5000', '', '', ''),
(15, '86e26510-cab7-11e8-9954-d92365983c83', 'San Jose', 'Beautiful Santa Clara Cottage', '1 Bedroom 1 Bath Cottage Close To Santa Clara University - Sleeps 4\nThis beautifully decorated cottage has 1 bedroom and 1 bathroom with a private backyard.\n\nFeatures & Amenities Include:\n\n- 1 Bedroom - Queen Size Bed\n\n- 1 Bathroom - Classic Decor with Marble Counter\n\n- Living Room - Sleeper Sofa with Queen Size Bed\n\n- Dining area\n\n- Kitchen - Fully Equipped\n\n- Microwave, stove, dishwasher, granite counters\n\n- Washer and Dryer\n\n- WiFi and Direct TV\n\n- Heating and Air Conditioning', 'Cottage', '1', '4', '1', '3', '1539216000000', '1542240000000', '$', '2', '157', '001433b0-cab7-11e8-9954-d92365983c83', '', '1538975022561', 'Parking,Internet,Linens Provided,No Smoking,Oven or Stove,Washer & Dryer,Lawn / Garden', '408', '', '', ''),
(16, 'ef6db350-cab7-11e8-9954-d92365983c83', 'San Jose', 'Upscale Brand New Townhouse 3B3.5B with Pool & Gym', 'Built in 2016 this modern townhouse has all the conveniences you would expect plus a whole lot more. Once you enter this townhouse you will immediately recognize the value of the Great Room concept. Its open feel and many windows provide you with exceptional views and plenty of light. In the kitchen you will find European-style cabinetry with soft close drawers, a center island, Granite slab counters, Stainless Steel GE appliances and a large walk in pantry and work station. Off the kitchen is an oversized covered balcony. It\'s great for relaxing and Barbecuing anytime of year. Upstairs you find yourself in a large master bedroom suite that has many possible uses, the laundry area and the second bedroom suite. The master bath has separate shower, dual sinks and a large walk in closet.', 'TownHome', '3', '7', '3', '3', '1539043200000', '1541203200000', '$', '15', '280', '001433b0-cab7-11e8-9954-d92365983c83', '', '1538975197957', 'Parking,Internet,Linens Provided,No Smoking,Oven or Stove,Washer & Dryer,Lawn / Garden', '1980', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `property_images`
--

CREATE TABLE `property_images` (
  `id` int(11) NOT NULL,
  `user_id` text NOT NULL,
  `property_id` text NOT NULL,
  `name` text NOT NULL,
  `path` text NOT NULL,
  `time` text NOT NULL,
  `ex1` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `property_images`
--

INSERT INTO `property_images` (`id`, `user_id`, `property_id`, `name`, `path`, `time`, `ex1`) VALUES
(1, '', 'f17800f0-bd7f-11e8-8c7e-274b39c1f69f', 'IMG-20130206-WA0001.jpg', '1537521784430.jpeg', '1537521784447', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0001.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537521784430.jpeg\",\"path\":\"uploads/1537521784430.jpeg\",\"size\":111962}'),
(2, '', 'f17800f0-bd7f-11e8-8c7e-274b39c1f69f', 'IMG-20130206-WA0005.jpg', '1537521784432.jpeg', '1537521784447', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0005.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537521784432.jpeg\",\"path\":\"uploads/1537521784432.jpeg\",\"size\":78518}'),
(3, '', 'e35ebb20-bd80-11e8-8c7e-274b39c1f69f', 'mid1.JPG', '1537522190237.jpeg', '1537522190290', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid1.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537522190237.jpeg\",\"path\":\"uploads/1537522190237.jpeg\",\"size\":1310059}'),
(4, '', 'e35ebb20-bd80-11e8-8c7e-274b39c1f69f', 'mid3.JPG', '1537522190282.jpeg', '1537522190290', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid3.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537522190282.jpeg\",\"path\":\"uploads/1537522190282.jpeg\",\"size\":1270604}'),
(5, '', '5e22cd10-bd81-11e8-8c7e-274b39c1f69f', 'mid2.JPG', '1537522396231.jpeg', '1537522396257', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid2.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537522396231.jpeg\",\"path\":\"uploads/1537522396231.jpeg\",\"size\":1312037}'),
(6, '', '5e22cd10-bd81-11e8-8c7e-274b39c1f69f', 'mid3.JPG', '1537522396248.jpeg', '1537522396257', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid3.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537522396248.jpeg\",\"path\":\"uploads/1537522396248.jpeg\",\"size\":1270604}'),
(7, '', '511845e0-bd87-11e8-ac6b-2bd6f5db6258', 'mid1.JPG', '1537524951299.jpeg', '1537524951357', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid1.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537524951299.jpeg\",\"path\":\"uploads/1537524951299.jpeg\",\"size\":1310059}'),
(8, '', '511845e0-bd87-11e8-ac6b-2bd6f5db6258', 'mid3.JPG', '1537524951330.jpeg', '1537524951357', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid3.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537524951330.jpeg\",\"path\":\"uploads/1537524951330.jpeg\",\"size\":1270604}'),
(9, '', 'b337bfd0-bd87-11e8-ac6b-2bd6f5db6258', '5.jpg', '1537525115957.jpeg', '1537525115981', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"5.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525115957.jpeg\",\"path\":\"uploads/1537525115957.jpeg\",\"size\":1578024}'),
(10, '', 'b337bfd0-bd87-11e8-ac6b-2bd6f5db6258', 'mid2.JPG', '1537525115973.jpeg', '1537525115981', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid2.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525115973.jpeg\",\"path\":\"uploads/1537525115973.jpeg\",\"size\":1312037}'),
(11, '', 'bcc52a00-bd88-11e8-ac6b-2bd6f5db6258', '4 (1).jpg', '1537525561465.jpeg', '1537525561504', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"4 (1).jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525561465.jpeg\",\"path\":\"uploads/1537525561465.jpeg\",\"size\":1665513}'),
(12, '', 'bcc52a00-bd88-11e8-ac6b-2bd6f5db6258', '4.jpg', '1537525561475.jpeg', '1537525561504', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"4.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525561475.jpeg\",\"path\":\"uploads/1537525561475.jpeg\",\"size\":1665513}'),
(13, '', '06438e60-bd89-11e8-ac6b-2bd6f5db6258', 'IMG-20130206-WA0000.jpg', '1537525684801.jpeg', '1537525684806', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0000.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525684801.jpeg\",\"path\":\"uploads/1537525684801.jpeg\",\"size\":69421}'),
(14, '', '06438e60-bd89-11e8-ac6b-2bd6f5db6258', 'IMG-20130206-WA0005.jpg', '1537525684802.jpeg', '1537525684806', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0005.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525684802.jpeg\",\"path\":\"uploads/1537525684802.jpeg\",\"size\":78518}'),
(15, '', '5422dbe0-bd89-11e8-ac6b-2bd6f5db6258', 'IMG-20130206-WA0002.jpg', '1537525815445.jpeg', '1537525815454', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0002.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525815445.jpeg\",\"path\":\"uploads/1537525815445.jpeg\",\"size\":76201}'),
(16, '', '5422dbe0-bd89-11e8-ac6b-2bd6f5db6258', 'IMG-20130206-WA0003.jpg', '1537525815447.jpeg', '1537525815454', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0003.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537525815447.jpeg\",\"path\":\"uploads/1537525815447.jpeg\",\"size\":63768}'),
(17, '', '643f4b70-bdda-11e8-b5ec-a132b4826137', '5.jpg', '1537560631680.jpeg', '1537560631719', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"5.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537560631680.jpeg\",\"path\":\"uploads/1537560631680.jpeg\",\"size\":1578024}'),
(18, '', '643f4b70-bdda-11e8-b5ec-a132b4826137', '6.jpg', '1537560631705.jpeg', '1537560631719', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"6.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537560631705.jpeg\",\"path\":\"uploads/1537560631705.jpeg\",\"size\":1263023}'),
(19, '', 'e1e93f40-bdda-11e8-b5ec-a132b4826137', 'IMG-20130206-WA0005.jpg', '1537560842526.jpeg', '1537560842548', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"IMG-20130206-WA0005.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537560842526.jpeg\",\"path\":\"uploads/1537560842526.jpeg\",\"size\":78518}'),
(20, '', 'e1e93f40-bdda-11e8-b5ec-a132b4826137', 'mid2.JPG', '1537560842527.jpeg', '1537560842548', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"mid2.JPG\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"uploads/\",\"filename\":\"1537560842527.jpeg\",\"path\":\"uploads/1537560842527.jpeg\",\"size\":1312037}'),
(21, '', '3460b520-bfe1-11e8-889e-8d82af574d7b', 'lm_benice328f.jpg', '1537783460203.jpeg', '1537783460210', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"lm_benice328f.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1537783460203.jpeg\",\"path\":\"uploads/1537783460203.jpeg\",\"size\":44389}'),
(22, '', '3460b520-bfe1-11e8-889e-8d82af574d7b', 'slide-lg-2-3.jpg', '1537783460204.jpeg', '1537783460210', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"slide-lg-2-3.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1537783460204.jpeg\",\"path\":\"uploads/1537783460204.jpeg\",\"size\":293531}'),
(23, '', 'eef64960-c2b4-11e8-a9ad-f964e5710152', '893158dc-5c9d-4d4d-8347-ffc94d401426.c10.jpg', '1538094299361.jpeg', '1538094299382', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"893158dc-5c9d-4d4d-8347-ffc94d401426.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538094299361.jpeg\",\"path\":\"uploads/1538094299361.jpeg\",\"size\":106872}'),
(24, '', 'eef64960-c2b4-11e8-a9ad-f964e5710152', 'b6703f93-6fb2-4789-bda2-dfcfad979c34.c10.jpg', '1538094299366.jpeg', '1538094299382', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"b6703f93-6fb2-4789-bda2-dfcfad979c34.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538094299366.jpeg\",\"path\":\"uploads/1538094299366.jpeg\",\"size\":63406}'),
(25, '', 'eef64960-c2b4-11e8-a9ad-f964e5710152', 'lm_benice328f.jpg', '1538094299367.jpeg', '1538094299382', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"lm_benice328f.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538094299367.jpeg\",\"path\":\"uploads/1538094299367.jpeg\",\"size\":44389}'),
(26, '', 'eef64960-c2b4-11e8-a9ad-f964e5710152', 'slide-lg-2-3.jpg', '1538094299369.jpeg', '1538094299382', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"slide-lg-2-3.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538094299369.jpeg\",\"path\":\"uploads/1538094299369.jpeg\",\"size\":293531}'),
(27, '', '3cb486e0-c511-11e8-8e0e-5d08af12b0d5', 'pexels-photo-164338.jpeg', '1538353845826.jpeg', '1538353845837', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"pexels-photo-164338.jpeg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538353845826.jpeg\",\"path\":\"uploads/1538353845826.jpeg\",\"size\":569033}'),
(28, '', '3cb486e0-c511-11e8-8e0e-5d08af12b0d5', 'pexels-photo-106399.jpeg', '1538353845820.jpeg', '1538353845837', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"pexels-photo-106399.jpeg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538353845820.jpeg\",\"path\":\"uploads/1538353845820.jpeg\",\"size\":342777}'),
(29, '', '3cb486e0-c511-11e8-8e0e-5d08af12b0d5', 'lm_benice328f.jpg', '1538353845817.jpeg', '1538353845837', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"lm_benice328f.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538353845817.jpeg\",\"path\":\"uploads/1538353845817.jpeg\",\"size\":44389}'),
(30, '369b8710-c83e-11e8-ab9f-5d885b16c598', '37300970-c83f-11e8-8b09-eb62f01f6cef', '893158dc-5c9d-4d4d-8347-ffc94d401426.c10.jpg', '1538703446908.jpeg', '1538703446919', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"893158dc-5c9d-4d4d-8347-ffc94d401426.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538703446908.jpeg\",\"path\":\"uploads/1538703446908.jpeg\",\"size\":106872}'),
(31, '369b8710-c83e-11e8-ab9f-5d885b16c598', '37300970-c83f-11e8-8b09-eb62f01f6cef', 'b6703f93-6fb2-4789-bda2-dfcfad979c34.c10.jpg', '1538703446911.jpeg', '1538703446919', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"b6703f93-6fb2-4789-bda2-dfcfad979c34.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538703446911.jpeg\",\"path\":\"uploads/1538703446911.jpeg\",\"size\":63406}'),
(32, '001433b0-cab7-11e8-9954-d92365983c83', '86e26510-cab7-11e8-9954-d92365983c83', '2T.jpg', '1538975022547.jpeg', '1538975022561', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"2T.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975022547.jpeg\",\"path\":\"uploads/1538975022547.jpeg\",\"size\":68753}'),
(33, '001433b0-cab7-11e8-9954-d92365983c83', '86e26510-cab7-11e8-9954-d92365983c83', '3T.jpg', '1538975022551.jpeg', '1538975022561', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"3T.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975022551.jpeg\",\"path\":\"uploads/1538975022551.jpeg\",\"size\":79020}'),
(34, '001433b0-cab7-11e8-9954-d92365983c83', '86e26510-cab7-11e8-9954-d92365983c83', '78c3ebce-c79c-4a47-92ae-46a046daa626.c10.jpg', '1538975022553.jpeg', '1538975022561', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"78c3ebce-c79c-4a47-92ae-46a046daa626.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975022553.jpeg\",\"path\":\"uploads/1538975022553.jpeg\",\"size\":111391}'),
(35, '001433b0-cab7-11e8-9954-d92365983c83', 'ef6db350-cab7-11e8-9954-d92365983c83', '2T.jpg', '1538975197946.jpeg', '1538975197957', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"2T.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975197946.jpeg\",\"path\":\"uploads/1538975197946.jpeg\",\"size\":68753}'),
(36, '001433b0-cab7-11e8-9954-d92365983c83', 'ef6db350-cab7-11e8-9954-d92365983c83', '3T.jpg', '1538975197948.jpeg', '1538975197957', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"3T.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975197948.jpeg\",\"path\":\"uploads/1538975197948.jpeg\",\"size\":79020}'),
(37, '001433b0-cab7-11e8-9954-d92365983c83', 'ef6db350-cab7-11e8-9954-d92365983c83', '4t.jpg', '1538975197950.jpeg', '1538975197957', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"4t.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538975197950.jpeg\",\"path\":\"uploads/1538975197950.jpeg\",\"size\":94232}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_random` text NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `about` text NOT NULL,
  `city` text NOT NULL,
  `country` text NOT NULL,
  `company` text NOT NULL,
  `school` text NOT NULL,
  `hometown` text NOT NULL,
  `languages` text NOT NULL,
  `gender` text NOT NULL,
  `joinedon` text NOT NULL,
  `acctype` text NOT NULL,
  `photo` text NOT NULL,
  `photodata` text NOT NULL,
  `ex1` text NOT NULL,
  `ex2` text NOT NULL,
  `ex3` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_random`, `name`, `email`, `phone`, `about`, `city`, `country`, `company`, `school`, `hometown`, `languages`, `gender`, `joinedon`, `acctype`, `photo`, `photodata`, `ex1`, `ex2`, `ex3`) VALUES
(1, '8fd9bf20-bde6-11e8-b912-2bba59d0f694', 'wewe', 'wefewf@gmail.com', '', '', '', '', '', '', '', '', '', '1537565858834', 'SELLER', '', '', 'efewf', '', ''),
(2, '59d0c7b0-bde7-11e8-9e86-6305fa790988', 'asdds', 'wefewf1@gmail.com', '', '', '', '', '', '', '', '', '', '1537566197675', 'SELLER', '', '', 'asdasd', '', ''),
(3, '62073090-bdec-11e8-9e86-6305fa790988', 'asd', 'asd@gmail.in', '', '', '', '', '', '', '', '', '', '1537568358937', 'SELLER', '', '', 'asd', '', ''),
(4, 'fe66d110-bded-11e8-9e86-6305fa790988', 'asdad', 'asd@yahoo.in', '', '', '', '', '', '', '', '', '', '1537569050785', 'SELLER', '', '', 'qweqe', '', ''),
(5, '0afc2410-bdef-11e8-9e86-6305fa790988', 'asd', 'asd@yasd.cin', '', '', '', '', '', '', '', '', '', '1537569501393', 'SELLER', '', '', 'asd', '', ''),
(6, '629bc810-bdef-11e8-9e86-6305fa790988', 'ad', 'dsaasd@yahoo.cm', '', '', '', '', '', '', '', '', '', '1537569648401', 'SELLER', '', '', 'asdasd', '', ''),
(7, 'fcee9e10-bdef-11e8-9e86-6305fa790988', 'eqwe', 'asdmald@yaho.res', '', '', '', '', '', '', '', '', '', '1537569907313', 'SELLER', '', '', 'melrewl', '', ''),
(8, '1f7f7e90-bdf0-11e8-9e86-6305fa790988', 'asdasd', 'asdjkas@yahoo.res', '', '', '', '', '', '', '', '', '', '1537569965305', 'SELLER', '', '', 'eqweqwkl', '', ''),
(9, '3e60c490-bdf0-11e8-9e86-6305fa790988', 'sdnsamdnads', 'askdj@yahoo.jsad', '', '', '', '', '', '', '', '', '', '1537570017113', 'SELLER', '', '', 'jaksd', '', ''),
(10, '91d8def0-bdf0-11e8-9e86-6305fa790988', 'vaksndkjnda', 'basdnas@gmai.com', '', '', '', '', '', '', '', '', '', '1537570157151', 'SELLER', '', '', 'aksjndkjasd', '', ''),
(11, '6c938bd0-bdfb-11e8-bcb4-657a9909e404', 'Varun', 'hasdahsd@gmail.com', '', '', '', '', '', '', '', '', '', '1537574819085', 'SELLER', '', '', 's', '$2b$10$otQcRJ6wY7RXibDcJQ6syOaR1Tt.ATLfiM3fePyKTLXi6Fi2qyt56', ''),
(12, 'b778c140-bdfd-11e8-ac45-674f80c28ba0', 'Varun', 'abcd@yahoo.com', '', '', '', '', '', '', '', '', '', '1537575803732', 'SELLER', '', '', 'ss', '$2b$10$pworsdtmF9mifmgCsL.ng.6wADPdvb1PevAPIUfkcsWc7U3VHqO8u', ''),
(13, 'eeaeee40-be21-11e8-9a95-c3308e05feea', 'Varun', 'asd@asd.in', '', '', '', '', '', '', '', '', '', '1537591358244', 'SELLER', '', '', 's', '$2b$10$3Vu/2d0psx2vScN9Mx1PbuKE6n62eLcaAoW37NUmT72gaFEsXnfoK', ''),
(14, '634294f0-be27-11e8-9a95-c3308e05feea', 'varun', 'fast@gmail.com', '', '', '', '', '', '', '', '', '', '1537593701311', 'SELLER', '', '', 's', '$2b$10$KPo5h9HtH9NrC57umyJAp.Ibfhda4ZIK1abDQCER9/HjOnk/IdSn.', ''),
(15, 'edea1270-be33-11e8-8e8a-75e4ff1510b5', '\'varunkshj\'', '88scuderia@gmail.com', '\'6693775415\'', '\'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\'', '\'Mumbai\'', '\'India\'', '\'F1gh\'vh4324\'', '\'RNPqwewe314434\'34\'', '\'Hbp\'', '\'Hindi,English\'', 'Male', '1537599087894', 'SELLER', '1538209598228.jpeg', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"b6703f93-6fb2-4789-bda2-dfcfad979c34.c10.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538209598228.jpeg\",\"path\":\"uploads/1538209598228.jpeg\",\"size\":63406}', '\'d\'souza\'', '$2b$10$WJtNEL7kz2TmNo7Tz57Cleai/ruUmod/D8iht00.ml8fh7UsD69SS', ''),
(18, '369b8710-c83e-11e8-ab9f-5d885b16c598', '33scuderia', '33scuderia@gmail.com', '', '', '', '', '', '', '', '', '', '1538703016448', 'SELLER', '', '', 'tifosi', '$2b$10$jm5hZULF8xT1wbqY76g2ZuKCSSmvsN4vP/QPYk2r/5FP1jytnoON2', ''),
(19, 'e5592250-c846-11e8-aa67-0575140a7555', '\'55scuderia@gmail.com\'', '55scuderia@gmail.com', '\'(667) 878-7878\'', '\'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '\'\'', '', '1538706745589', 'TRAVELLER', '1538924694577.jpeg', '{\"fieldname\":\"uploadSelect\",\"originalname\":\"lm_benice328f.jpg\",\"encoding\":\"7bit\",\"mimetype\":\"image/jpeg\",\"destination\":\"./uploads/\",\"filename\":\"1538924694577.jpeg\",\"path\":\"uploads/1538924694577.jpeg\",\"size\":44389}', '\'tifosi34\'', '$2b$10$hubHx9nWu/U/tk/sQaYX2OaZ9bHWf3NvTYwQI44AS0SGxk9yAI2Ru', ''),
(20, '001433b0-cab7-11e8-9954-d92365983c83', 'John', 'john.doe@gmail.com', '', '', '', '', '', '', '', '', '', '1538974796395', 'SELLER', '', '', 'Doe', '$2b$10$QZ721N7/qc4geB2JXzSkC.JA80GRogTOcW.yKiB2R3ljOq7IChTkq', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_images`
--
ALTER TABLE `property_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(90) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `property_images`
--
ALTER TABLE `property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
