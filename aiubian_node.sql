-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2020 at 06:13 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aiubian_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `aiubId` varchar(15) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(12) NOT NULL,
  `email` varchar(150) NOT NULL,
  `department` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `name`, `aiubId`, `username`, `password`, `email`, `department`, `status`) VALUES
(10, 'Nazib Mahfuz', '17-34418-1', 'nazib', 'nazib', 'nazibmahfuz60@gmail.com', 'Faculty of Science and Technology', 'Student'),
(11, 'Shourov', '17-34425-1', 'shourov', '12345', 'shourov@gmail.com', 'Faculty of Business Administrator', 'Alumni'),
(12, 'Shourov', '17-34425-1', 'abc', '123', 'abc@gmail.com', 'Faculty of Engineering', 'Alumni');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postId` int(11) NOT NULL,
  `postDate` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` varchar(20) NOT NULL,
  `text` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `video` varchar(250) NOT NULL,
  `postLike` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `UserId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `aiub_id` varchar(15) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `facebook` varchar(150) NOT NULL,
  `linkedin` varchar(150) NOT NULL,
  `department` varchar(100) NOT NULL,
  `program` varchar(50) NOT NULL,
  `semester` int(2) NOT NULL,
  `thesisName` varchar(200) NOT NULL,
  `skills` varchar(250) NOT NULL,
  `github` varchar(200) NOT NULL,
  `stackoverflow` varchar(200) NOT NULL,
  `hackerrank` varchar(200) NOT NULL,
  `portfolio` varchar(200) NOT NULL,
  `workingPlace` varchar(150) NOT NULL,
  `website` varchar(200) NOT NULL,
  `workingDomain` varchar(250) NOT NULL,
  `joiningDate` varchar(50) NOT NULL,
  `publishedPaper` varchar(5) NOT NULL,
  `thesisDomain` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`UserId`, `name`, `email`, `aiub_id`, `phone`, `facebook`, `linkedin`, `department`, `program`, `semester`, `thesisName`, `skills`, `github`, `stackoverflow`, `hackerrank`, `portfolio`, `workingPlace`, `website`, `workingDomain`, `joiningDate`, `publishedPaper`, `thesisDomain`) VALUES
(1, 'nazib', 'nazib@gmail.com', '173245', 'facebook', 'linkedin', 'dept', 'cse', 'thesis', 0, 'github', 'stackoverflow', 'hacker', 'portfolio', 'workingplace', 'website', 'workingDomain', 'joiningDate', '5', 'thesisDomain', '21', '22'),
(2, 'name', 'email', 'aiub_id', 'phone', 'facebook', 'linkedin', 'department', 'program', 0, 'thesisname', 'skills', 'github', 'stackoverflow', 'hackerrank', 'portfolio', 'workingPlace', 'website', 'workingDomain', 'joiningDate', '05', 'thesisDomain');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
