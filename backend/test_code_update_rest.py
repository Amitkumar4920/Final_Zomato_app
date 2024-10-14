import unittest
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True


# Test updating a restaurant
    def test_update_restaurant(self):

        response = self.app.put('/restaurants/id', json={
            "name": "Updated Restaurant",
            "location": "Updated Location",
            "cuisine": "Updated Cuisine",
            "rating": 4.0
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("Updated Restaurant", response.get_json()["name"])

if __name__ == '__main__':
    unittest.main()