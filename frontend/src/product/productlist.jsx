import React from 'react'
import Productcard from './Productcard'
import { Box } from '@chakra-ui/react'

function Productlist() {

  var Prodarr=[
    {
      _id:"1",
      productName:"Block Nomad Sofa",
      description:"The cornerstone of our Nomad Collection is the essential sofa reinvented for modern life. The first truly easy-to-move sofa thanks to our award-winning modular design; it has plenty of room for three people, or more if you're into cuddling. It's packed with all the clever, life-changing features you expect from Burrow, starting with a built-in USB charger.",
      sellingPrice:"1599",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/qT1VqyQStKf3UPI5c4w5",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/00nzCOTNTQWtErRZrw0k",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/ojZk1CuBS7kcpOAyDoCe",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/U29UAwESpmqAsKnR2Y3j"
    },
    {
      _id:"2",
      productName:"Block Nomad King Sectional",
      description:"We took our Nomad King Sofa and made it even more royal, with a chaise lounge addition. In our mind, this is the perfect family room sofa, with space for everyone and then some to kick back and relax. The versatile chaise addition can be swapped to either side, or placed in front of either of the middle seat sections. Like everything we make, our modular design is incredibly easy to move and packed with all the clever, life-changing features you expect from Burrow, starting with a built-in USB charger.",
      sellingPrice:"2490",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/ByJ0L2DSTRyF3pgbIQgv",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/XnOaANoHTg617xZPAl7m",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/8vDGHR4wRzuBN6yGKJuB",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/U29UAwESpmqAsKnR2Y3j"
    },
    {
      _id:"3",
      productName:"Field Leather 4-Piece Sectional Lounger",
      description:"The familiar three-seat sofa with a chaise configuration of our Field Collection. Designed to accommodate a wide spectrum of styles, Field is a versatile couch that, true to our promise of adaptable furniture, can grow to fit your space with additional modules in the future. Hallmarks of the collection include deeper seats, plush cushions, and top-grain Italian leather — keep scrolling to get the full story.",
      sellingPrice:"3249",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/DViKzuZSNSgfTyPz6UHg",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/MaHFH3JYTN6UEIlILRix",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/5OCPu8HAROuOSXRgWi5l",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/5DR4i2gSWFgCm3HK92sQ"
    },
    {
      _id:"4",
      productName:"Mambo Sofa",
      description:"Ladies and gentleman, this is Mambo. A modern, modular seating system that refuses to compromise between comfort, style, or convenience. Unlike other blocky contemporary sofas and sectionals — that are basically just foam blocks wrapped in fabric made for looking at and not sitting in — Mambo features graceful curves and soft cushions in all the right places. With high or low arm options, durable fabric or luxurious leather upholstery, and adaptable modular design, it’s a canvas for your dream couch.",
      sellingPrice:"3249",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/BEvoRSrNS9e5yMuF3LEz",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/sPRsWkDqQa2Sdn3hlvlm",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/QcVl4RnOQFmgwZN2Jpnh",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/0g8uWA0R3CFBT1Bo8aJQ"
    },
    {
      _id:"5",
      productName:"Union 4-Seat Sectional",
      description:"The familiar three-seat sofa with a chaise configuration of our Field Collection. Designed to accommodate a wide spectrum of styles, Field is a versatile couch that, true to our promise of adaptable furniture, can grow to fit your space with additional modules in the future. Hallmarks of the collection include deeper seats, plush cushions, and top-grain Italian leather — keep scrolling to get the full story.",
      sellingPrice:"3699",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/ldiPuUFrRkCOUzd1FDuT",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/MaHFH3JYTN6UEIlILRix",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/9sFDLn4RLlnDv1wVxJKQ",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/OdgFOYA1Sa2w5KkK8zRx"
    },
    {
      _id:"5",
      productName:"Union 4-Seat Sectional",
      description:"The familiar three-seat sofa with a chaise configuration of our Field Collection. Designed to accommodate a wide spectrum of styles, Field is a versatile couch that, true to our promise of adaptable furniture, can grow to fit your space with additional modules in the future. Hallmarks of the collection include deeper seats, plush cushions, and top-grain Italian leather — keep scrolling to get the full story.",
      sellingPrice:"3699",
      retailPrice:"",
      imagePath1:"https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/ldiPuUFrRkCOUzd1FDuT",
      imagePath2:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/MaHFH3JYTN6UEIlILRix",
      imagePath3:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/9sFDLn4RLlnDv1wVxJKQ",
      category_id:"Sofa",
      stock:"5",
      rate: 0,
      rateCount: 0,
      rateTotal: 0,
      hoverImge:"https://media.graphassets.com/resize=w:120,fit:crop/output=format:webp/compress/OdgFOYA1Sa2w5KkK8zRx"
    }
  ]

  return (
    <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={2}>
    {
      Prodarr?.map((elem, i) => {
            return <Productcard key={i} elem={elem}  />
        })
    }
</Box>
   
  )
}

export default Productlist

