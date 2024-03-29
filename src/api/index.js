import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBJbRfBLeXbhNNksDlO5v_uTgMpRZhiAvI',
  authDomain: 'vanlife-28669.firebaseapp.com',
  projectId: 'vanlife-28669',
  storageBucket: 'vanlife-28669.appspot.com',
  messagingSenderId: '771541759606',
  appId: '1:771541759606:web:0de75f6ca1de2bea945157',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)

const vansCollection = collection(db, 'vans')
const usersCollection = collection(db, 'users')

export async function fetchAllVans() {
  try {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return vans
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchVanById(id) {
  try {
    const vanDoc = await getDoc(doc(db, 'vans', id))

    if (!vanDoc.exists()) {
      throw new Error('Document not found')
    }

    return { id: doc.id, ...vanDoc.data() }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchHostVans(userId) {
  try {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return vans.filter((van) => van.hostId === userId)
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchHostSingleVan(id) {
  try {
    const vanDoc = await getDoc(doc(db, 'vans', id))

    if (!vanDoc.exists()) {
      throw new Error('Document not found')
    }

    return { id, ...vanDoc.data() }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function loginUser(creds) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    )
    return userCredential
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function registerUser(creds) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    )

    const userData = {
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      ratedVans: [],
    }

    await setDoc(doc(usersCollection, userCredential.user.uid), userData)

    return userCredential
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function addVan(vanData) {
  try {
    await addDoc(collection(db, 'vans'), vanData)
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function rateVan(vanId, rating) {
  try {
    const vanDocRef = doc(db, 'vans', vanId)
    const vanDocSnapshot = await getDoc(vanDocRef)

    if (!vanDocSnapshot.exists()) {
      throw new Error('Van document does not exist')
    }

    const vanData = vanDocSnapshot.data()

    if (!vanData) {
      throw new Error('Van data or rating not available')
    }

    const newRating =
      vanData.rating === 0 ? rating / 2 : (vanData.rating + rating / 2) / 2

    await setDoc(vanDocRef, { ...vanData, rating: newRating })

    console.log('Van rating updated successfully:', vanId, newRating)
  } catch (error) {
    console.error('Error rating van:', error)
    throw new Error(error.message)
  }
}

export async function getVanRating(vanId) {
  try {
    const vanDoc = await getDoc(doc(db, 'vans', vanId))

    if (!vanDoc.exists()) {
      throw new Error('Document not found')
    }

    return vanDoc.data().rating
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function addUserRatedVan(userId, vanId) {
  try {
    const userRef = doc(usersCollection, userId) // Update this line
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()

      // Ensure userData.ratedVans is an array
      const ratedVans = Array.isArray(userData.ratedVans)
        ? userData.ratedVans
        : []

      if (!ratedVans.includes(vanId)) {
        await setDoc(userRef, { ...userData, ratedVans: [...ratedVans, vanId] }) // Update this line
      }
    } else {
      throw new Error('User document not found')
    }
  } catch (error) {
    console.error('Error updating user rated vans:', error)
    throw new Error(error.message)
  }
}

// export async function addUserRatedVan(userId, vanId) {
//   try {
//     const userDocRef = doc(db, 'users', userId)
//     const userDocSnapshot = await getDoc(userDocRef)

//     if (!userDocSnapshot.exists()) {
//       throw new Error('User document does not exist')
//     }

//     const userData = userDocSnapshot.data()

//     if (!userData) {
//       throw new Error('User data not available')
//     }

//     const newRatedVans = [...userData.ratedVans, vanId]

//     await setDoc(userDocRef, { ...userData, ratedVans: newRatedVans })

//     console.log('User rated van successfully:', userId, vanId)
//   } catch (error) {
//     console.error('Error adding rated van:', error)
//     throw new Error(error.message)
//   }
// }

/* LEGACY CODE ========================================== */

// export async function fetchAllVans() {
//   const response = await fetch('http://localhost:8000/vans')
//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch vans: ${response.status} ${response.statusText}`
//     )
//   }
//   const data = await response.json()
//   return data
// }

// export async function fetchVanById(id) {
//   const response = await fetch(`http://localhost:8000/vans/${id}`)
//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch van: ${response.status} ${response.statusText}`
//     )
//   }
//   const data = await response.json()
//   return data
// }

// export async function fetchHostVans() {
//   const response = await fetch('http://localhost:8000/vans')
//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch vans: ${response.status} ${response.statusText}`
//     )
//   }
//   const data = await response.json()
//   return data.filter((van) => van.hostId === 123)
// }

// export async function fetchHostSingleVan(id) {
//   const response = await fetch(`http://localhost:8000/vans/${id}`)
//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch van: ${response.status} ${response.statusText}`
//     )
//   }
//   const data = await response.json()
//   return data
// }

// export async function loginUser(creds) {
//   const response = await fetch('http://localhost:8000/users')
//   if (!response.ok) {
//     throw new Error(
//       `Failed to login: ${response.status} ${response.statusText}`
//     )
//   }
//   const data = await response.json()
//   return data.find(
//     (user) => user.email === creds.email && user.password === creds.password
//   )
// }

// export async function loginUser(creds) {
//   try {
//     const snapshot = await getDocs(usersCollection)
//     const users = snapshot.docs.map((doc) => doc.data())
//     return users.find(
//       (user) => user.email === creds.email && user.password === creds.password
//     )
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }
