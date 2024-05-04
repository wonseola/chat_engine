import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'; // 추가: SetState import
import { db } from './firebase';

interface User {
    username: string;
    avatar?: string
    uid: string;
    id: string;
}

interface UserStore {
    currentUser: User | null;
    isLoading: boolean;
    fetchUserInfo: (uid: string) => Promise<any>;
}

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid: string | null) => {
        if (!uid) {
            set({ currentUser: null, isLoading: false });
            return;
        }
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() as User, isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (error) {
            console.log(error);
            set({ currentUser: null, isLoading: false });
        }
    }

}));
