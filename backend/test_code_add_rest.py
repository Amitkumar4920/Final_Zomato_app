import unittest
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

# Test adding a new restaurant
    def test_add_restaurant(self):
        response = self.app.post('/restaurants', json={
            "name": "Test Restaurant",
            "location": "Test Location",
            "cuisine": "Test Cuisine",
            "rating": 4.5
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn("Test Restaurant", response.get_json()["name"])

if __name__ == '__main__':
    unittest.main()