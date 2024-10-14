import unittest
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True


# Test deleting a restaurant
    def test_delete_restaurant(self):

        response = self.app.delete('/restaurants/id')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Restaurant deleted", response.get_json()["message"])

if __name__ == '__main__':
    unittest.main()
