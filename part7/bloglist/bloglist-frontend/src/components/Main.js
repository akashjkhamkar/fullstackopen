import { useSelector } from 'react-redux'

const Main = (props) => {
  const user = useSelector(state => state.user)

  if(!user){
    return null
  }

  return props.children
}

export default Main