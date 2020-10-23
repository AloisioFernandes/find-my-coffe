import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, Dimensions } from 'react-native'
//-----------------------------------------------vvvvvvvvvvvvvvvvv ?????
import EstablishmentService from '../../services/google_establishment.js' 

const Establishment = (props) => {
  const [establishment, setEstablishment] = useState(null)

  useEffect(() => {
    getEstablishmentInformations()
  }, [props.place])

  async function getEstablishmentInformations() {
    try {
      const response = await EstablishmentService.show(props.place.place_id)
      setEstablishment(response.data.results)
    } catch(error) {
      setEstablishment([])
    }
  }

  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
    flex: 1,
    width: '80%',
    alignSelf: 'center'
  }
})

export default Establishment