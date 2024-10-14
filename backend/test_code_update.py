import unittest
import json
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_update_customer(self):
        # Assuming a customer with ID exists, replace 'some_id' with a valid ID
        updated_customer = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "0987654321",
            "address": "456 Elm St",
            "dish_selected": "Pasta",
            "rating": 4
        }
        response = self.app.put('/customers/67066d1d766b9e0a675fdae0', data=json.dumps(updated_customer), content_type='application/json')
        self.assertIn(response.status_code, [200, 404])  # 200 if updated, 404 if not found

if __name__ == '__main__':
    unittest.main()
