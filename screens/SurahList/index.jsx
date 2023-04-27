import {
   ScrollView,
   StyleSheet
} from 'react-native'
import Background from '../../elements/background'
import {useEffect, useState} from 'react'
import ListSurah from './ListSurah'
import BeforeOpenSurahModal from './BeforeOpenSurahModal'
import Loading from '../../elements/Loading'

export default function SurahList() {

   const [listSurah, setListSurah] = useState([])
   const [openSurahModalOpen, setOpenSurahModalOpen] = useState(false)
   const [selectedSurah, setSelectedSurah] = useState(undefined)
   const [loading, setLoading] = useState(true)

   const handleOpenSurahModalClose = () => {
      console.log('Closing')
      setOpenSurahModalOpen(false)
   }

   const fetchSurah = async () => {
      setLoading(true)
      await fetch('https://quran-api-id.vercel.app/surahs').then( async response => {
         const data = await response.json()
         setListSurah(data)
         setLoading(false)
      }).catch(() => {
         fetchSurah()
      })
   }

   const handleOpenSurah = surah => {
      setOpenSurahModalOpen(true)
      setSelectedSurah(surah)
   }

   useEffect(() => {
      fetchSurah()
   }, [])

   return (
      <Background>
         {!loading && (
            <>
               <BeforeOpenSurahModal open={openSurahModalOpen} onClose={handleOpenSurahModalClose.bind(this)} surah={selectedSurah} />
               <ScrollView style={styles.listContainer}>
                  {listSurah.map((surah, index) => (
                     <ListSurah surah={surah} key={index} onOpenSurah={surah => handleOpenSurah(surah)} />
                  ))}
               </ScrollView>
            </>
         )}
         {loading && <Loading message='' />}
      </Background>
   )
}


const styles = StyleSheet.create({
   listContainer: {
      gap: 10,
      display: 'flex',
      flexDirection: 'column'
   }
})