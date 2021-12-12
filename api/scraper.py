import bs4 as bs
import urllib.request
import json

def is_number(character):
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if character in numbers:
        return True
    return False
            

def get_number(text):
    number = ''
    for i in range(len(text)):
        if is_number(text[i]):
            number += text[i]
    if number == '':
        return text
    if len(number) == 4 and int(number) >= 6000:
        return number[:2]
    else:
        return number
        
sauce = urllib.request.urlopen('https://www.ontariouniversitiesinfo.ca/universities').read()
soup = bs.BeautifulSoup(sauce, 'lxml')

all_info = []
program_links = []
for university in soup.find_all('article'):
    all_info.append([university.h2.text, university.find_all('a')[1].text])
    program_links.append(university.find_all('a')[2].get('href'))

for i in range(len(program_links)):
    sauce_programs = urllib.request.urlopen(f'https://www.ontariouniversitiesinfo.ca{program_links[i]}').read()
    soup_programs = bs.BeautifulSoup(sauce_programs, 'lxml')

    programs = []
    program_sublinks = []
    for program in soup_programs.find_all('article'):
        programs.append([program.h2.text])
        program_sublinks.append(program.a.get('href'))
    for j in range(len(programs)):
        sauce_program = urllib.request.urlopen(f'https://www.ontariouniversitiesinfo.ca{program_sublinks[j]}').read()
        soup_program = bs.BeautifulSoup(sauce_program, 'lxml')

        program_info = []
        for info in soup_program.find_all('dd'):
            program_info.append(get_number(info.text.replace('\n', '').replace('\t', '')))
        programs[j].append(program_info)
    all_info[i].append(programs)


with open("Dictionary.json", "w") as outfile:
    json.dump(all_info, outfile)

