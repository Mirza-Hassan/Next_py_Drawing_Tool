export const saveShapeData = async (shapeData) => {
    try {
      const response = await fetch('http://localhost:8000/api/shapes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shapeData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Shape saved:', data);
    } catch (error) {
      console.error('Error saving shape:', error);
    }
  };
  