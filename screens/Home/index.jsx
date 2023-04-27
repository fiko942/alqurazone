import {Text, View, ImageBackground, ScrollView, Button, Image, TouchableOpacity, Linking} from 'react-native'
import { StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import ArrosyidinImage from '../../assets/image/logo.png'
import {useEffect, useState} from 'react'

import FacebookIcon from '../../icons/facebook.png'
import YoutubeIcon from '../../icons/youtube.png'
import InstagramIcon from '../../icons/instagram.png'

const colors = {
   btn_background_menu_item: '#609966'
}


const welcomeStyles = StyleSheet.create({
   card: {
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: '90%',
      borderRadius: 10,
   }
})

function Contacts() {
   return (
      <View style={{
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10
      }}>
         <Link icon={FacebookIcon} href='https://www.facebook.com/arrosyidin.umat' size={30} />
         <Link icon={InstagramIcon} href='https://www.instagram.com/arrosyidinpeduliumat/' size={30} />
         <Link icon={YoutubeIcon} href='https://www.youtube.com/channel/UCRDm1LswWTdC_W17hrLIxiw' size={30} />
      </View>
   )
}

function Link({icon, href, size}) {

   const handleOpenUrl = () => {
      Linking.openURL(href)
   }

   return (
      <TouchableOpacity width={size} height={size} onPress={handleOpenUrl.bind(this)}>
         <Image source={icon} style={{width: size, height: size}} />
      </TouchableOpacity>
   )
}

function Dev() {

   const openDevUrl = () => {
      Linking.openURL('https://resume.tobelsoft.my.id')
   }

   return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
         <Text>by </Text>
         <TouchableOpacity onPress={openDevUrl.bind(this)}>
         <Text style={{textDecorationStyle: 'solid', textDecorationColor: 'blue', textDecorationLine: 'underline'}}>Wiji Fiko Teren</Text>
         </TouchableOpacity>
      </View>
   )
}

function WelcomeCard({listSurahButton}) {
   return (
      <View style={{...welcomeStyles.card}}>
         <Image source={ArrosyidinImage} style={{...{maxWidth: '100%'}}} resizeMode='contain' />
         <View style={{
            flexDirection: 'row',
            alignItems: 'center'
         }}>
               <View>
                  <Contacts />
                  <Dev />
               </View>
               <View style={{flex: 1}}>
                  {listSurahButton}
               </View>
         </View>
      </View>
   )
}

export default function Home() {
   const navigation = useNavigation()


   const handleNavigate = (screenName) => {
      navigation.navigate(screenName)
   }

   return (
      <View style={styles.container}>
         <ImageBackground source={require('../../assets/image/islamic_bg.jpg')} style={styles.background} resizeMode='cover'>
            <View style={styles.MenuContainer}>
            <WelcomeCard listSurahButton={(
               <View style={styles.btnMenuList}>
                  <Button style={styles.btnMenuList} title="List Surah" onPress={handleNavigate.bind(this, 'SurahList')} color={colors.btn_background_menu_item} />
               </View>
            )} />
               
            </View>
         </ImageBackground>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
   },
   background: {
      flex: 1,
      justifyContent: 'center'
   },
   btnMenuList: {
      flexDirection: 'row',
      fontWeight: 600,
      fontSize: 19,
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 0
   },
   MenuContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      height: '100%',
      display: 'flex',
      gap: 10
   }
})