import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite'
import {
  getAuth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

const vansCollection = collection(db, 'vans')
const usersCollection = collection(db, 'users')

/*=== VAN RELATED FUNCTIONS ==============================================*/
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

/*=== USER RELATED FUNCTIONS ==============================================*/
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
      transactions: [],
    }

    await setDoc(doc(usersCollection, userCredential.user.uid), userData)

    return userCredential
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function removeUser(userId, password) {
  try {
    const user = auth.currentUser

    if (!user) {
      throw new Error('User not signed in.')
    }

    const credential = EmailAuthProvider.credential(user.email, password)

    await reauthenticateWithCredential(user, credential)

    await deleteDoc(doc(usersCollection, userId))
    await user.delete()
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getUserTransactions(userId) {
  try {
    const userRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists) {
      throw new Error('User not found')
    }

    const userData = userDoc.data()

    if (!userData.transactions || !Array.isArray(userData.transactions)) {
      return []
    }

    return userData.transactions
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function calcAverageUserRatings(userId) {
  try {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const userVans = vans.filter((van) => van.hostId === userId)

    if (userVans.length === 0) {
      return 0
    }

    let totalRating = 0
    userVans.forEach((van) => {
      const rating = van.rating || 0
      totalRating += rating
    })

    const averageRating = totalRating / userVans.length

    return averageRating
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

export async function rateVan(vanId, review) {
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

    const newReviewsArray = Array.isArray(vanData.reviews)
      ? [...vanData.reviews, review]
      : [review]
    await updateDoc(vanDocRef, { reviews: newReviewsArray })

    const newAverageRating =
      newReviewsArray.reduce((acc, review) => acc + review.rating, 0) /
      newReviewsArray.length /
      2
    await updateDoc(vanDocRef, { rating: newAverageRating })
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
    const userRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()

      const ratedVans = Array.isArray(userData.ratedVans)
        ? userData.ratedVans
        : []

      if (!ratedVans.includes(vanId)) {
        await setDoc(userRef, { ...userData, ratedVans: [...ratedVans, vanId] })
      }
    } else {
      throw new Error('User document not found')
    }
  } catch (error) {
    console.error('Error updating user rated vans:', error)
    throw new Error(error.message)
  }
}

export async function getVanReviews(vanId) {
  try {
    const vanDoc = await getDoc(doc(db, 'vans', vanId))

    if (!vanDoc.exists()) {
      throw new Error('Document not found')
    }

    return vanDoc.data().reviews
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getHostVanReviews(hostId) {
  try {
    const snapshot = await getDocs(vansCollection)
    const vans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return vans
      .filter((van) => van.hostId === hostId)
      .flatMap((van) => van.reviews)
  } catch (error) {
    throw new Error(error.message)
  }
}

/*=== TRANSACTION RELATED FUNCTIONS ==============================================*/

export async function rentVan(rentalData) {
  try {
    await addDoc(collection(db, 'rentals'), rentalData)
    return { success: true }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchUserRentals(userId) {
  try {
    const snapshot = await getDocs(collection(db, 'rentals'))
    const rentals = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((rental) => rental.renterId === userId)
    return rentals
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function fetchHostRentedVans(hostId) {
  try {
    const snapshot = await getDocs(collection(db, 'rentals'))
    const rentals = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((rental) => rental.vanInfo.vanOwner === hostId)

    const rentedVansIds = [
      ...new Set(rentals.map((rental) => rental.vanInfo.vanId)),
    ]
    return rentedVansIds
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function findOwnerAndAddTransaction(vanId, transactionData) {
  try {
    const vanDoc = await getDoc(doc(db, 'vans', vanId))

    if (!vanDoc.exists()) {
      throw new Error('Van not found')
    }

    const vanData = vanDoc.data()

    if (!vanData) {
      throw new Error('Van data not available')
    }

    const hostId = vanData.hostId
    const hostRef = doc(usersCollection, hostId)
    const hostDoc = await getDoc(hostRef)

    if (!hostDoc.exists()) {
      throw new Error('Host not found')
    }

    const hostData = hostDoc.data()

    if (!hostData) {
      throw new Error('Host data not available')
    }

    const transactions = Array.isArray(hostData.transactions)
      ? [...hostData.transactions, transactionData]
      : [transactionData]

    await updateDoc(hostRef, { transactions })
  } catch (error) {
    throw new Error(error.message)
  }
}

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
