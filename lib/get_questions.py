import requests
import io

def add_50(data, f, counter):
	i = 0
	while i < len(data['results']):
		item = data['results'][i]

		question = item['question']
		correct = item['correct_answer']
		incorrects = item['incorrect_answers']

		incorrect_1 = incorrects[0]
		incorrect_2 = incorrects[1]
		incorrect_3 = incorrects[2]

		json_item = ("\"" + str(counter + i + 1) + "\" : {\n\t\t\t\"question\" : \""
					+ question + "\",\n\t\t\t\"1\" : \""
					+ correct + "\",\n\t\t\t\"2\" : \""
					+ incorrect_1 + "\",\n\t\t\t\"3\" : \""
					+ incorrect_2 + "\",\n\t\t\t\"4\" : \""
					+ incorrect_3 + "\"\n\t\t},\n\t\t"
					)
		try:
			f.write(json_item)
		except:
			continue

		i = i + 1


URL = "https://opentdb.com/api.php"

number = 500

PARAMS = {'amount': 50, 'type': "multiple"}

r = requests.get(url=URL, params=PARAMS)

data = r.json()

with open("questions.json", "w", encoding='utf8') as f:
	file_head = "{\n\t\"questions\" : {\n\t\t"
	f.write(file_head)

	add_50(data, f, 0)

for i in range(50, number, 50):
	PARAMS = {'amount': number - i, 'type': "multiple"}

	r = requests.get(url=URL, params=PARAMS)

	data = r.json()

	with open("questions.json", "a", encoding='utf8') as f:
		add_50(data, f, i)