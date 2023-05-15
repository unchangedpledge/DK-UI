import _Card from './Card'
// import Submit from './Submit'
import { consumer } from './context'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
// import Accordion from './Accordion'

const Card = _Card
Card.Header = consumer(Header, ['extra'])
Card.Body = Body
Card.Footer = Footer

Card.Body.displayName = 'ShineoutCardBody'
Card.Header.displayName = 'ShineoutCardHeader'
Card.displayName = 'ShineoutCard'

export default Card
