import { ML_URL } from "@env";
export default analyzeSentiment = async (text) => {
    try {
        const response = await fetch(ML_URL+'/analyzeSentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        });
      const data = await response.json();
      return data.mood
    } catch (error) {
        console.log('Error performing sentiment analysis:', error)
        console.error('Error performing sentiment analysis:', error);
    }
};
