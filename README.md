# FinançApp Front-End Project
Trabalho de Conclusão de Curso para o curso de Análise e Desenvolvimento de Sistemas da Universidade Federal do Paraná.

Developed by:<br>
<b>Christian Dueck
<br>Cleriton Muchinski
<br>Leonardo Castro de Oliveira</b>

<br>

### Figma Project
https://www.figma.com/file/CxFseBWSNkHe34Id5nQfTd

<br>

## Getting Started

With docker installed, after cloning this repository, enter the project folder <b>financapp-front</b>.

<b>1.</b> Build docker image:

```bash
docker build -t financapp-front .
```
<b>2.</b> After successful build, run the docker container on port <b>3000</b>:

```bash
docker run -p 3000:3000 financapp-front
```

<b>3.</b> With docker running, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.