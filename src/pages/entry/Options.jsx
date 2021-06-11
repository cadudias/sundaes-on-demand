import { useEffect, useState } from "react"
import axios from "axios"
import Row from "react-bootstrap/Row"
import ScoopOption from "./ScoopOption"
import ToppingOption from "./ToppingOption"
import AlertBanner from '../common/AlertBanner';

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false);

  // will run once on compoennt mount and
  // again when optionType changes
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption

  // creates a componente for each scoop otpion
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}
