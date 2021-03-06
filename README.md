# Context Broker Data Visualisation

![FIWARE Visualisation](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/visualization.svg)
![License](https://img.shields.io/github/license/ConnectingEurope/Context-Broker-Data-Visualisation)
![Docker pulls](https://img.shields.io/docker/pulls/cbenablereveris/cb-data-visualisation-enabler)
![StackOverflow](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/orion.svg)
![NGSI v2](https://nexus.lab.fiware.org/repository/raw/public/badges/specifications/ngsiv2.svg)

**Master:** ![Master](https://github.com/ConnectingEurope/Context-Broker-Data-Visualisation/workflows/Docker%20Image%20CI/badge.svg) **Develop:** ![Develop](https://github.com/ConnectingEurope/Context-Broker-Data-Visualisation/workflows/Docker%20Image%20CI/badge.svg?branch=develop)

The **Context Broker Data Visualisation** is an **enabler** which consists on a **visualisation layer** over the Context Broker. It provides the following features:

- **Real-time data** visualisation through geo-localized sensors on a map, based on the information from the **Orion Context Broker**.

- **Historical data** visualisation for the sensors in table and graph formats, taking advantage of historical data tools like **Cygnus** and **STH-Comet**.

- Easy **Configuration page** for the integration with the Context Broker and the historical data tools.

- Integration with **more than one Context Broker instance at the same time**.

- Deployment in **local environments** or **FIWARE lab** (Sandbox).

For more information, read the [Objective](#objective) section.

The Context Broker Data Visualisation is a FIWARE Generic Enabler. Therefore, it can be integrated as part of any platform “Powered by FIWARE”. FIWARE is a curated framework of open source platform components which can be assembled together with other third-party platform components to accelerate the development of Smart Solutions.

You can find more info at the [FIWARE developers](https://developers.fiware.org/) website and the [FIWARE](https://fiware.org/) website.

The complete list of FIWARE GEs and Incubated FIWARE GEs can be found at the [FIWARE Catalogue](https://catalogue.fiware.org/).

| :earth_africa: [CEF Digital](https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/Services+Context+Broker) | :briefcase: [FIWARE Marketplace](https://marketplace.fiware.org/pages/enablers) | :books: [User manual](doc/user/index.md) | :books: [Deployment manual](doc/tutorials/index.md) | :books: [Technical manual](doc/technical/index.md) | :whale: [DockerHub](https://hub.docker.com/u/cbenablereveris) |

## Content

- [Objective](#objective)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Reference documentation](#reference-documentation)
- [Context Broker instances with real data](#context-broker-instances-with-real-data)
- [License](#license)
- [Contributors](#contributors)

## Objective

The Context Broker Data Visualisation enabler was created with the aim of:

- Facilitating the **experimentation and learning** for new stakeholders in the Sandbox with the Context Broker, using a visualization layer.

- Facilitating the **adoption** of the Context Broker for new solutions.

- **Increasing the developer's community** around the Context Broker.

- Creating an enabler that could be **reused in smart city verticals**.

It is a **learning tool** for data visualisation, not a product.

It could also be adapted to the needs of different users by developing its own features, taking advantage of the base of the enabler. More information can be found in the [documentation](#documentation) section.

[Top](#context-broker-data-visualisation)

## Documentation

The documentation of the Context Broker Data Visualisation enabler is available in the following [link](doc/index.md).

[Top](#context-broker-data-visualisation)

## Deployment

There are four different tutorials for the deployment of the enabler, in a local environment or in [FIWARE lab](https://www.fiware.org/developers/fiware-lab/).

They can be found in the following [link](doc/tutorials/index.md).

[Top](#context-broker-data-visualisation)

## Reference documentation

The following documentation is recommended to be read before starting to use the Context Broker Data Visualisation enabler:

- [Orion Context Broker](https://fiware-orion.readthedocs.io/en/2.4.0/)
- [FIWARE data models](https://www.fiware.org/developers/data-models/)
- [FIWARE tutorials](https://github.com/FIWARE/tutorials.Step-by-Step)
- [Cygnus](https://fiware-cygnus.readthedocs.io/en/1.18.3/)
- [STH-Comet](https://fiware-sth-comet.readthedocs.io/en/latest/)
- [FIWARE tutorials: Short term history](https://github.com/FIWARE/tutorials.Short-Term-History)
- [FIWARE lab](https://www.fiware.org/developers/fiware-lab/)
- [NGSI v2 specifications](http://fiware.github.io/specifications/ngsiv2/stable/)

[Top](#context-broker-data-visualisation)

## Context Broker instances with real data

The following links provide documentation of some **Context Broker instances with real data**. All of them are open data, so it can be used for testing purposes. Those Context Brokers could be integrated with the enabler:

- [FIWARE Data Streams](https://documenter.getpostman.com/view/3940441/RznEMKdr?version=latest): Data of environment, point of interest and weather.
- [Opplafy.eu](https://data.opplafy.eu/dataset): Data of parkings, traffic alers, buses, traffic cameras, etc.

Note the previous links are external instances and are not maintenined by the developers of the enabler, so it would be possible some of them could fail.

Additionally, it is also possible to generate test data to be used in the enabler. The procedure is detailed in the [tutorials of deployment documentation](doc/tutorials/index.md).

[Top](#context-broker-data-visualisation)

## Testing

The Context Broker Data Visualisation enabler has been tested with the following tools:

- [Orion Context Broker v2.4.0](https://github.com/telefonicaid/fiware-orion/tree/2.4.0)
- [Cygnus v1.18.3](https://github.com/telefonicaid/fiware-cygnus/tree/1.18.3)
- [STH-Comet v2.7.0](https://github.com/telefonicaid/fiware-sth-comet/tree/2.7.0)
- [MongoDB v3.6](https://github.com/mongodb/mongo/tree/r3.6.0)

[Top](#context-broker-data-visualisation)

## License

Context Broker Data Visualisation is licensed under [European Union Public License v1.2](LICENSE).

[Top](#context-broker-data-visualisation)

## Contributors

The Context Broker Data Visualisation enabler has been carried out by:

- [CEF Digital](https://ec.europa.eu/cefdigital/wiki/display/CEFDIGITAL/CEF+Digital+Home)
- [everis](https://www.everis.com/)
- [FIWARE](https://www.fiware.org/)

[Top](#context-broker-data-visualisation)
