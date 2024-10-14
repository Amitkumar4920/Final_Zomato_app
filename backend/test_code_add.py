import unittest
import json
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # def test_get_customers(self):
    #     response = self.app.get('/customers')
    #     self.assertEqual(response.status_code, 200)

    def test_add_customer(self):
        new_customer = {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "address": "123 Main St",
            "dish_selected": "Pizza",
            "rating": 5,
        }
        response = self.app.post('/customers', data=json.dumps(new_customer), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn("id", data)

if __name__ == '__main__':
    unittest.main()
