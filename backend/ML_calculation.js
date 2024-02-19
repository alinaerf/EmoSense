import { ML_URL } from "@env";
export default analyzeSentiment = async (text) => {
    console.log(ML_URL+'analyzeSentiment')
    try {
        const response = await fetch(ML_URL+'/analyzeSentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        });
        const data = await response.json();
        console.log(data)
      return data.mood
    } catch (error) {
        console.log('Error performing sentiment analysis:', error)
    }
};
