// Simple test script for newsletter functionality
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testNewsletterSubscription() {
  console.log('🧪 Testing Newsletter Subscription...\n');

  try {
    // Test 1: Valid email subscription
    console.log('Test 1: Subscribing with valid email...');
    const response1 = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, {
      email: 'test@example.com'
    });
    console.log('✅ Success:', response1.data.message);
    console.log('📧 Email:', response1.data.data.email);
    console.log('📅 Subscribed at:', response1.data.data.subscribedAt);
    console.log('');

    // Test 2: Duplicate email subscription
    console.log('Test 2: Attempting duplicate subscription...');
    try {
      await axios.post(`${API_BASE_URL}/newsletter/subscribe`, {
        email: 'test@example.com'
      });
    } catch (error) {
      console.log('✅ Expected error:', error.response.data.message);
    }
    console.log('');

    // Test 3: Invalid email format
    console.log('Test 3: Testing invalid email format...');
    try {
      await axios.post(`${API_BASE_URL}/newsletter/subscribe`, {
        email: 'invalid-email'
      });
    } catch (error) {
      console.log('✅ Expected validation error:', error.response.data.message);
    }
    console.log('');

    // Test 4: Get newsletter stats
    console.log('Test 4: Fetching newsletter statistics...');
    const statsResponse = await axios.get(`${API_BASE_URL}/newsletter/stats`);
    console.log('📊 Newsletter Stats:');
    console.log('   Total Active Subscribers:', statsResponse.data.data.totalSubscribers);
    console.log('   Recent Subscriptions (30 days):', statsResponse.data.data.recentSubscriptions);
    console.log('');

    // Test 5: Unsubscribe
    console.log('Test 5: Unsubscribing...');
    const unsubscribeResponse = await axios.post(`${API_BASE_URL}/newsletter/unsubscribe`, {
      email: 'test@example.com'
    });
    console.log('✅ Unsubscribed:', unsubscribeResponse.data.message);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testNewsletterSubscription();
