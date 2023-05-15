import _Collapse from './Collapse'
// import Submit from './Submit'
import { consumer } from './context'
import Panel from './Panel'

const Collapse = _Collapse
Collapse.Panel = consumer(Panel, ['activeKey', 'onCollapse'])

export default Collapse
