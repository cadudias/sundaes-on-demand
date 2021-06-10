import { useEffect, useState } from "react"
import axios  from "axios"
import Row from 'react-bootstrap/Row'
import ScoopOption from "./ScoopOption"
import ToppingOption from "./ToppingOption"

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  // will run once on compoennt mount and
  // again when optionType changes
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error
      })
  }, [optionType])

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption

  // creates a componente for each scoop otpion
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>
}
