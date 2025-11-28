import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp, 
  orderBy,
  Timestamp
} from "firebase/firestore";
import { nanoid } from "nanoid";

export interface Project {
  id: string;
  ownerId: string;
  ownerEmail?: string;
  title: string;
  client: string;
  clientEmail?: string;
  slug: string;
  dueDate?: Timestamp;
  progress: number;
  status: "active" | "completed" | "archived";
  createdAt: Timestamp;
  currentFocus?: string;
  liveLink?: string;
  timeline?: { id: number; name: string; completed: boolean }[];
}

export const addProject = async (
  data: { client: string; clientEmail?: string; project: string; date?: Date; timeline?: { id: number; name: string; completed: boolean }[] }, 
  userId: string,
  ownerEmail: string | null | undefined
) => {
  try {
    const slug = `${data.project.toLowerCase().replace(/\s+/g, '-')}-${nanoid(6)}`;
    
    const docRef = await addDoc(collection(db, "projects"), {
      ownerId: userId,
      ownerEmail: ownerEmail || "",
      title: data.project,
      client: data.client,
      clientEmail: data.clientEmail || "",
      slug: slug,
      dueDate: data.date ? Timestamp.fromDate(data.date) : null,
      progress: 0,
      status: "active",
      timeline: data.timeline || [],
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  console.log("Fetching projects for:", userId);
  try {
    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", userId)
      // orderBy("createdAt", "desc") // Temporarily removed for debugging
    );

    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });
    
    console.log("Projects found:", projects);
    return projects;
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const q = query(
      collection(db, "projects"),
      where("slug", "==", slug),
      // limit(1) // limit is not imported, but query will return all matches. We just take the first.
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Project;
  } catch (error) {
    console.error("Error getting project by slug: ", error);
    throw error;
  }
};

export const addFeedback = async (projectId: string, message: string) => {
  try {
    await addDoc(collection(db, `projects/${projectId}/feedbacks`), {
      message,
      createdAt: serverTimestamp(),
      read: false,
      sender: "client"
    });
  } catch (error) {
    console.error("Error adding feedback: ", error);
    throw error;
  }
};
