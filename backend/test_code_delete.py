import unittest
import json
from app import app

class CustomerAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_delete_customer(self):
        # Assuming a customer with ID exists, replace 'some_id' with a valid ID
        response = self.app.delete('/customers/67066d1d766b9e0a675fdae0')
        self.assertIn(response.status_code, [200, 404])  # 200 if deleted, 404 if not found

if __name__ == '__main__':
    unittest.main()
