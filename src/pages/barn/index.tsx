// import { useMemo } from 'react'
// import { useRouter } from 'next/router'
// import StakeForWool from 'views/Barn/StakeForWool'
// import StakeForMilk from 'views/Barn/StakeForMilk'
// import StakeWolf from 'views/Barn/StakeWolf'
import Barn from 'views/Barn'

export default Barn

// const Barn = () => {
//   const { asPath: fullpath } = useRouter()

//   const page = useMemo(() => {
//     if (fullpath === '/barn#stakeforwool') {
//       return <StakeForWool />
//     }

//     if (fullpath === '/barn#stakeformilk') {
//       return <StakeForMilk />
//     }

//     if (fullpath === '/barn#stakewolf') {
//       return <StakeWolf />
//     }
//     return null
//   }, [fullpath])

//   return <>{page}</>
// }

// export default Barn
