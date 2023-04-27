import Loading from '../../elements/Loading'
import {useEffect, useState} from 'react'
import Main from './Main'

export default function SurahDetail({ route }) {
   const [loading, setLoading] = useState(true)
   const [data, setData] = useState(undefined)

   const fetchData = () => {
      fetch(`https://quran-api-id.vercel.app/surahs/${route.params.surah.number}/ayahs`).then(async response => {
         const text = await response.text()
         const data = JSON.parse(text)

         const {range} = route.params
         var x = []
         for(var i = 1; i <= data.length; i++) {
            if(i >= range[0] && i <= range[1]) {
               x.push(data[i-1])
            }
         }

         setData(x)
         setLoading(false)
      }).catch(() => fetchData())
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <>
      {loading && <Loading message='Memuat ...' />}
      {!loading && <Main surah={route.params.surah} range={route.params.range} data={data} />}
      </>
   )
}