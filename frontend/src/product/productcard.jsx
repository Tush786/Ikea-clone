import React, { useState } from 'react'
import {Link} from "react-router-dom"
// import HoverImage from 'react-hover-image/build'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

function Productcard({elem}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
 <div>
 <Link to={`/product/${elem._id}`}>
 <div>
    <img  src={elem. imagePath1} hoverSrc={elem.hoverImge} />
  </div>
 </Link>
 
  <div>
    <p>{elem.productName}</p>
    <p>${elem.sellingPrice}</p>
  </div>
 </div>

  )
}

export default Productcard