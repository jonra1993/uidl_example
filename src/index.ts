import { createReactComponentGenerator } from '@teleporthq/teleport-component-generator-react'
import {createNextProjectGenerator} from "@teleporthq/teleport-project-generator-next"
import {createHTMLComponentGenerator} from "@teleporthq/teleport-component-generator-html"
import {createDiskPublisher} from "@teleporthq/teleport-publisher-disk"
import {createHTMLProjectGenerator} from "@teleporthq/teleport-project-generator-html"

import nextProjectUidl from './assets/project-sample.json';
import componentUidl from './assets/component-sample.json';
import htmlProjectUidl from './assets/htmlproject.json';


const createReactComponent = async () => {    
    const uidl = componentUidl
    const generator = createReactComponentGenerator();
    const { files } = await generator.generateComponent(uidl)
    console.log(files[0].content)    
};

const createHtmlComponent = async () => {    
    const uidl = componentUidl
    const generator = createHTMLComponentGenerator();
    const { files } = await generator.generateComponent(uidl)
    console.log(files[0].content)    
};

const createNextProject = async () => {
    const uidl = nextProjectUidl
    const generator = createNextProjectGenerator();
    const publisher = createDiskPublisher();
    const project = await generator.generateProject(uidl)
    const outputPath = "./"
    const result = await publisher.publish({ project, outputPath })
    console.log(project)
};

const createHtmlProject = async () => {
    const uidl = htmlProjectUidl
    const generator = createHTMLProjectGenerator();
    const publisher = createDiskPublisher();
    const project = await generator.generateProject(uidl)
    const outputPath = "./"
    const result = await publisher.publish({ project, outputPath })
    console.log(project)
};

createNextProject()

