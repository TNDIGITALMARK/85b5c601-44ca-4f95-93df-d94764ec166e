async function listMigrations() {
  try {
    const response = await fetch('http://localhost:3006/api/supabase/migrations/list', {
      method: 'GET'
    });

    if (!response.ok) {
      console.log('Error:', response.status, response.statusText);
      return;
    }

    const result = await response.json();
    console.log('Migration list:', JSON.stringify(result, null, 2));
  } catch (error: any) {
    console.error('Error listing migrations:', error.message);
  }
}

listMigrations();
