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

/* LEGACY CODE ==========================================*/

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
