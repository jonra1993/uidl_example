import { createReactComponentGenerator } from '@teleporthq/teleport-component-generator-react'
import { createNextProjectGenerator } from "@teleporthq/teleport-project-generator-next"
import { createHTMLComponentGenerator } from "@teleporthq/teleport-component-generator-html"
import { createDiskPublisher } from "@teleporthq/teleport-publisher-disk"
import { createHTMLProjectGenerator } from "@teleporthq/teleport-project-generator-html"
import { createProjectPacker } from "@teleporthq/teleport-project-packer"
import { createVercelPublisher } from "@teleporthq/teleport-publisher-vercel"
import { Validator } from "@teleporthq/teleport-uidl-validator";

import nextProjectUidl from './assets/project-sample.json';
import componentUidl from './assets/component-sample.json';
import htmlProjectUidl from './assets/htmlproject.json';
import { ComponentUIDL, ProjectUIDL, VComponentUIDL } from '@teleporthq/teleport-types'

const VERCEL_TOKEN = "rqev2idkLdornTjAVXvJOKex"

const cleanComponentUIDL = async (input: VComponentUIDL) => {
    // @ts-ignore
    const validator = new Validator();
    const schemaValidationResult = validator.validateComponentSchema(input);
    const { componentUIDL, valid } = schemaValidationResult;
    if (valid && componentUIDL) {
        const cleanedUIDL = (componentUIDL as unknown) as Record<string, unknown>;
        return cleanedUIDL
    } else {
        throw new Error(schemaValidationResult.errorMsg);
    }
};

const packageProject = async () => {
    // @ts-ignore
    const uidl: ProjectUIDL = nextProjectUidl
    const vercelPublisher = createVercelPublisher({ accessToken: VERCEL_TOKEN })
    const projectPacker = createProjectPacker()
    const nextGenerator = createNextProjectGenerator()
    projectPacker.setPublisher(vercelPublisher)
    // @ts-ignore
    projectPacker.setGenerator(nextGenerator)
    const result = await projectPacker.pack(uidl)
    console.log(result)
};

const createReactComponent = async () => {
    const uidl: ComponentUIDL = {
        "name": "Message",
        "node": {
            "type": "element",

            "content": {
                "elementType": "text",
                "children": [
                    {
                        "type": "static",
                        "content": "Hello World!!"
                    }
                ]
            }
        }
    }
    // @ts-ignore
    const uidlCleaned = await cleanComponentUIDL(uidl)
    const generator = createReactComponentGenerator();
    const result = await generator.generateComponent(uidlCleaned)
    // @ts-ignore
    console.log(result.files[0])
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
    console.log(project.subFolders)
    //const result = await publisher.publish({ project, outputPath })
    //console.log(project)
};

createReactComponent()

